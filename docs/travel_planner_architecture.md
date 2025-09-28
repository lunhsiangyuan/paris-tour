# 旅遊規畫網站資料流程設計

## 1. 資料流程概覽
1. 使用者在前端輸入目的地 (destination) 與住宿位址 (lodging_address)。
2. 前端 (`planner.js`) 呼叫後端 API `/api/attractions`，將使用者輸入傳遞給後端。
3. 後端 (`scripts/travel_planner_service.py`) 接收請求後：
   - 驗證輸入值是否存在並符合格式。
   - 呼叫 MCP `browser_agents` 服務 (透過 `firecrawl-mcp`) 搜尋目的地及住處附近的景點資料。
   - 透過 `context7` (如有需要) 取得當地旅遊與交通的官方文件補充資訊。
   - 彙整景點資料為標準化 JSON (`name`, `description`, `address`, `lat`, `lng`, `source_url`, `categories`)。
4. 後端將整理後的 JSON 回傳給前端。
5. 前端渲染：
   - 在主目錄列表顯示景點摘要。
   - 利用 Google Maps JavaScript API 標註景點，點擊標記顯示詳細資訊。
   - 動態生成可下載的 JSON 與 CSV 供使用者備份 (透過 Blob 物件生成連結)。

## 2. 整合步驟細節
- **輸入驗證**：使用 Pydantic 驗證資料格式，並儲存至 `logs/` 目錄的日誌。
- **MCP 呼叫邏輯**：
  - 優先使用 `firecrawl_search` 搜尋「目的地 + 景點」關鍵字。
  - 針對住宿半徑 ±5 公里的位置使用 `firecrawl_map` 或 `firecrawl_scrape` 補充。
  - 擷取資料後，透過 `geopy` 或 Google Geocoding API (需 API key) 取得經緯度。
- **快取策略**：將每次查詢的結果以 `destination_lodging_timestamp.json` 命名，存放於 `project/temp_dir/`，有效期限 24 小時。
- **錯誤處理**：若 MCP 服務失敗，回退至使用 Google Places API (需 API key) 或 OpenTripMap API 查詢。

## 3. 前後端通訊格式
```json
{
  "destination": "Paris",
  "lodging_address": "96 Rue des Archives, Paris",
  "travel_dates": {
    "start": "2025-05-01",
    "end": "2025-05-10"
  }
}
```

回應格式：
```json
{
  "meta": {
    "destination": "Paris",
    "lodging_address": "96 Rue des Archives, Paris",
    "query_time": "2025-01-21T14:32:05Z",
    "confidence": 0.82,
    "sources": ["firecrawl", "Google Maps"]
  },
  "lodging": {
    "lat": 48.8612,
    "lng": 2.3583
  },
  "attractions": [
    {
      "name": "Place des Vosges",
      "description": "巴黎最古老的計畫廣場，建於 1605 年",
      "address": "Place des Vosges, 75004 Paris",
      "lat": 48.8559,
      "lng": 2.3654,
      "distance_km": 1.2,
      "categories": ["landmark", "history"],
      "source_url": "https://example.com/place-des-vosges"
    }
  ]
}
```

## 4. 安全與隱私
- 避免在前端暴露 API Key，全部放在後端 `.env`。
- `logs/` 內的日誌採循環覆寫策略，保留 7 天。
- 針對 MCP 及第三方 API 都需設置超時 (預設 15 秒) 與重試次數 (最多 3 次)。

## 5. 後續實作清單
1. 建立 `scripts/travel_planner_service.py`，提供 FastAPI 服務與 MCP 整合邏輯。
2. 新增 `planner.html` 與 `assets/js/planner.js`，實作前端互動與 Google Maps 標記。
3. 建立 `assets/css/planner.css`，確保響應式 UI 與主目錄版型一致。
4. 撰寫端對端測試 (`tests/test_planner_flow.py`)，模擬完整搜尋流程。
5. 完成 HTML 報告模版與自動生成功能，輸出至 `reports/report_YYYYMMDD_HHMMSS.html`。
