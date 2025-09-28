"""FastAPI 服務：旅遊規畫網站後端

提供景點搜尋與地圖資料，串接 MCP browser_agents 與 Firecrawl 搜尋。
"""

from __future__ import annotations

import json
import logging
import os
import re
from datetime import datetime, date
from pathlib import Path
from typing import Any, Dict, List, Optional

import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ValidationError, validator

BASE_DIR = Path(__file__).resolve().parent.parent
LOG_DIR = BASE_DIR / "logs"
TEMP_DIR = BASE_DIR / "project" / "temp_dir"

LOG_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR.mkdir(parents=True, exist_ok=True)

log_timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
log_file = LOG_DIR / f"analysis_{log_timestamp}.log"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(log_file),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("travel_planner")

FIRECRAWL_API_URL = "https://api.firecrawl.dev/v1/search"
NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"
DEFAULT_FIRECRAWL_KEY = "fc-6a2f115106ad4c83a2f4519158cd9b48"


def slugify(text: str) -> str:
    """將輸入字串轉換為檔名安全的 slug。"""
    return re.sub(r"[^a-zA-Z0-9]+", "-", text.strip()).strip("-").lower() or "result"


def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """計算兩點之間的大圓距離 (公里)。"""
    from math import asin, cos, radians, sin, sqrt

    r = 6371.0088  # 地球半徑 (km)
    d_lat = radians(lat2 - lat1)
    d_lon = radians(lon2 - lon1)
    a = sin(d_lat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(d_lon / 2) ** 2
    c = 2 * asin(sqrt(a))
    return r * c


class TravelDates(BaseModel):
    start: Optional[date] = Field(None, description="行程開始日期")
    end: Optional[date] = Field(None, description="行程結束日期")

    @validator("end")
    def validate_date_range(cls, v: Optional[date], values: Dict[str, Any]) -> Optional[date]:
        start = values.get("start")
        if v and start and v < start:
            raise ValueError("結束日期不可早於開始日期")
        return v


class PlannerRequest(BaseModel):
    destination: str = Field(..., min_length=2, description="旅遊目的地")
    lodging_address: str = Field(..., min_length=5, description="住宿地址")
    travel_dates: Optional[TravelDates] = None

    @validator("destination", "lodging_address")
    def strip_value(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("欄位內容不可為空白")
        return cleaned


class Attraction(BaseModel):
    name: str
    description: str
    address: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    distance_km: Optional[float] = None
    categories: List[str] = Field(default_factory=list)
    source_url: Optional[str] = None


class PlannerResponse(BaseModel):
    meta: Dict[str, Any]
    lodging: Dict[str, Any]
    attractions: List[Attraction]


class TravelPlannerService:
    """封裝 MCP 搜尋與資料整合的服務類別。"""

    def __init__(self) -> None:
        self.firecrawl_api_key = os.getenv("FIRECRAWL_API_KEY", DEFAULT_FIRECRAWL_KEY)
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "TravelPlanner/1.0 (https://example.com)",
            "Accept": "application/json"
        })

    def geocode(self, query: str) -> Optional[Dict[str, float]]:
        """使用 Nominatim 取得經緯度。"""
        try:
            params = {"q": query, "format": "json", "limit": 1}
            response = self.session.get(NOMINATIM_URL, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            if not data:
                return None
            location = data[0]
            return {"lat": float(location["lat"]), "lng": float(location["lon"])}
        except Exception as exc:  # pylint: disable=broad-except
            logger.warning("Geocode 失敗: %s", exc)
            return None

    def firecrawl_search(self, destination: str) -> List[Dict[str, Any]]:
        """呼叫 Firecrawl API 搜尋景點資料，若失敗則回傳空陣列。"""
        payload = {
            "query": f"{destination} best tourist attractions 2024",
            "limit": 8,
            "page": 1
        }
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.firecrawl_api_key}"
        }
        try:
            response = self.session.post(FIRECRAWL_API_URL, headers=headers, json=payload, timeout=20)
            response.raise_for_status()
            body = response.json()
            items = body.get("data") or body.get("results") or []
            return items
        except requests.HTTPError as http_err:
            logger.error("Firecrawl HTTP 錯誤: %s", http_err)
        except Exception as exc:  # pylint: disable=broad-except
            logger.error("Firecrawl 呼叫失敗: %s", exc)
        return []

    def normalize_results(
        self,
        raw_results: List[Dict[str, Any]],
        lodging_coords: Optional[Dict[str, float]]
    ) -> List[Attraction]:
        """將 Firecrawl 搜尋結果轉成 Attraction 資料結構。"""
        attractions: List[Attraction] = []
        for item in raw_results:
            metadata = item.get("metadata", {})
            name = item.get("title") or metadata.get("title") or "未命名景點"
            description = (item.get("snippet") or metadata.get("description") or "景點描述待補充").strip()
            coordinates = metadata.get("coordinates") or {}
            lat = coordinates.get("lat") or coordinates.get("latitude")
            lng = coordinates.get("lng") or coordinates.get("longitude")
            address = metadata.get("address") or item.get("url")
            categories = metadata.get("tags") or metadata.get("categories") or []

            distance = None
            if lodging_coords and lat and lng:
                try:
                    distance = round(
                        haversine_distance(
                            lodging_coords["lat"],
                            lodging_coords["lng"],
                            float(lat),
                            float(lng)
                        ),
                        2
                    )
                except Exception as exc:  # pylint: disable=broad-except
                    logger.debug("距離計算失敗: %s", exc)

            attraction = Attraction(
                name=name,
                description=description,
                address=address if isinstance(address, str) else None,
                lat=float(lat) if lat else None,
                lng=float(lng) if lng else None,
                distance_km=distance,
                categories=categories if isinstance(categories, list) else [str(categories)],
                source_url=item.get("url")
            )
            attractions.append(attraction)

        return attractions

    def build_response(
        self,
        request_data: PlannerRequest,
        lodging_coords: Optional[Dict[str, float]],
        attractions: List[Attraction]
    ) -> PlannerResponse:
        now_iso = datetime.utcnow().isoformat() + "Z"
        meta = {
            "destination": request_data.destination,
            "lodging_address": request_data.lodging_address,
            "query_time": now_iso,
            "result_count": len(attractions),
            "sources": ["firecrawl" if attractions else "fallback"],
        }
        if request_data.travel_dates:
            meta["travel_dates"] = request_data.travel_dates.dict()

        lodging_payload: Dict[str, Any] = {
            "address": request_data.lodging_address,
            "lat": lodging_coords.get("lat") if lodging_coords else None,
            "lng": lodging_coords.get("lng") if lodging_coords else None
        }

        response = PlannerResponse(
            meta=meta,
            lodging=lodging_payload,
            attractions=attractions
        )
        return response

    def cache_response(self, response: PlannerResponse) -> Path:
        filename = f"planner_{slugify(response.meta['destination'])}_{slugify(response.meta['lodging_address'])}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
        file_path = TEMP_DIR / f"{filename}.json"
        with file_path.open("w", encoding="utf-8") as fp:
            json.dump(response.dict(), fp, ensure_ascii=False, indent=2)
        logger.info("結果已快取至 %s", file_path)
        return file_path


service = TravelPlannerService()
app = FastAPI(title="Travel Planner Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/attractions", response_model=PlannerResponse)
async def get_attractions(payload: PlannerRequest) -> PlannerResponse:
    """接收旅遊規畫請求並回傳景點資訊。"""
    try:
        logger.info("收到旅遊規畫請求: %s", payload.json(ensure_ascii=False))
    except ValidationError as validation_err:
        logger.error("請求驗證錯誤: %s", validation_err)
        raise HTTPException(status_code=422, detail=str(validation_err)) from validation_err

    lodging_coords = service.geocode(payload.lodging_address)
    if not lodging_coords:
        logger.warning("無法取得住宿地址經緯度，將以目的地為基準。")
        lodging_coords = service.geocode(payload.destination)

    raw_results = service.firecrawl_search(payload.destination)
    if not raw_results:
        logger.warning("Firecrawl 未回傳結果，啟用備用景點資料。")
        raw_results = fallback_attractions(payload.destination)

    attractions = service.normalize_results(raw_results, lodging_coords)
    response = service.build_response(payload, lodging_coords, attractions)
    service.cache_response(response)
    return response


@app.get("/health")
async def health_check() -> Dict[str, str]:
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat() + "Z"}


def fallback_attractions(destination: str) -> List[Dict[str, Any]]:
    """當外部服務不可用時，提供基本景點資訊作為備用。"""
    presets = {
        "paris": [
            {
                "title": "Louvre Museum",
                "snippet": "世界著名的羅浮宮博物館，收藏無數藝術珍品。",
                "url": "https://www.louvre.fr/",
                "metadata": {
                    "address": "Rue de Rivoli, 75001 Paris, France",
                    "coordinates": {"lat": 48.8606, "lng": 2.3376},
                    "tags": ["museum", "art"]
                }
            },
            {
                "title": "Eiffel Tower",
                "snippet": "巴黎地標艾菲爾鐵塔，登頂可俯瞰整個城市。",
                "url": "https://www.toureiffel.paris/",
                "metadata": {
                    "address": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
                    "coordinates": {"lat": 48.8584, "lng": 2.2945},
                    "tags": ["landmark", "viewpoint"]
                }
            },
            {
                "title": "Musée d'Orsay",
                "snippet": "奧賽美術館以印象派藏品聞名，位於塞納河畔。",
                "url": "https://www.musee-orsay.fr/",
                "metadata": {
                    "address": "1 Rue de la Légion d'Honneur, 75007 Paris, France",
                    "coordinates": {"lat": 48.8599, "lng": 2.3266},
                    "tags": ["museum", "art"]
                }
            }
        ]
    }
    key = slugify(destination)
    return presets.get(key, [])


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
