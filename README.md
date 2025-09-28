# 巴黎瑪黑區導覽網站 | Paris Le Marais Guide

這是一個關於巴黎瑪黑區（Le Marais）及其周邊地區的互動式導覽網站。網站提供景點介紹、美食推薦和購物指南，並包含互動地圖功能。

## 專案結構

```
├── index.html                 # 首頁
├── planner.html               # 智慧旅遊規畫入口
├── assets/
│   ├── css/planner.css        # 旅遊規畫頁面樣式
│   └── js/planner.js          # 旅遊規畫互動腳本
├── scripts/
│   └── travel_planner_service.py  # FastAPI 後端服務
├── project/temp_dir/          # 查詢快取資料
├── docs/travel_planner_architecture.md  # 資料流程設計
├── marais.html                # 瑪黑區景點介紹
├── surroundings.html          # 周邊景點介紹
├── map.html                   # 互動地圖
├── spots.html                 # 景點詳細資訊
├── styles.css                 # 全域樣式
├── map.js                     # 地圖相關功能
└── README.md                  # 專案說明文件
```

## 功能特點

- 響應式設計，支援各種設備
- 互動式地圖，支援景點篩選
- 智慧旅遊規畫：呼叫 browser_agents (MCP) 自動彙整景點並在 Google Maps 呈現
- 自動產生旅遊景點 JSON / CSV 匯出
- 後端快取與錯誤回退機制，提高查詢穩定度
- 分類瀏覽：景點、美食、購物
- 區域篩選：瑪黑區、第1區、第2區、羅浮宮周邊
- 詳細的景點資訊，包含營業時間和地址
- 優雅的 UI/UX 設計

## 技術棧

- HTML5
- CSS3
- JavaScript
- Leaflet.js (地圖功能)
- Font Awesome (圖標)
- Google Fonts (字體)

## 開發指南

### 添加新景點

在 `map.html` 中的 `spots` 陣列中添加新的景點物件：

```javascript
{
    name: '景點名稱',
    area: '區域', // marais, district1, district2, louvre
    category: '類別', // landmark, food, shopping
    coords: [緯度, 經度],
    description: '描述',
    time: '營業時間',
    address: '地址'
}
```

### 修改樣式

- 全域樣式在 `styles.css`
- 頁面特定樣式在各自的 HTML 文件中
- 顏色變數定義在 `:root` 中

### 地圖功能擴展

在 `map.js` 中可以：
- 添加新的篩選條件
- 修改標記樣式
- 添加新的互動功能

## 旅遊規畫服務使用說明

### 1. 安裝依賴

```bash
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn[standard] requests python-dotenv
```

### 2. 設定環境變數

建立 `.env`（可選）：

```env
FIRECRAWL_API_KEY=請填入有效金鑰
OPENAI_API_KEY=若需 GPT-5 分析請填入
```

### 3. 啟動後端服務

```bash
uvicorn scripts.travel_planner_service:app --host 0.0.0.0 --port 8000 --reload
```

### 4. 啟動前端

- 使用任一靜態伺服器 (例如 `python -m http.server`) 於專案根目錄啟動。
- 確保前端同網域即可呼叫 `http://localhost:8000/api/attractions`。

### 5. 操作流程

1. 造訪 `planner.html`，輸入目的地與住宿地址。
2. 送出後系統會透過 MCP browser_agents 搜尋最新景點。
3. 地圖顯示景點標記，點擊可看詳細資訊。
4. 可下載 JSON / CSV 以便儲存或分享。

## 測試建議

- 單元測試：針對 `travel_planner_service.firecrawl_search` 與 `normalize_results` 建立假資料驗證資料格式。
- 端對端測試：啟動 FastAPI + 靜態伺服器後，使用 Playwright 或 Cypress 驗證整體流程與地圖互動。
- 例外測試：模擬 Firecrawl 回傳錯誤，確認 fallback 景點是否正確提供並顯示提醒訊息。
- 效能測試：記錄 API 回應時間，確保在 3 秒內完成主要搜尋流程。

## 待開發功能

1. 路線規劃與交通時間預估
2. 多語言切換與內容在地化
3. 景點評分及評論整合
4. 離線地圖緩存機制
5. 公共交通即時資訊串接
6. 住宿建議與價格比較
7. 行程自動排程與提醒系統
8. 景點圖片與 360° 實景串流

## 維護注意事項

1. 定期更新景點資訊
2. 確保地圖標記準確性
3. 檢查外部資源（CDN）可用性
4. 優化載入速度
5. 確保跨瀏覽器兼容性

## 貢獻指南

1. Fork 專案
2. 創建特性分支
3. 提交變更
4. 發起合併請求

## 版本歷史

- v1.0.0 (2024-03-28)
  - 初始版本發布
  - 基本地圖功能
  - 景點介紹頁面
  - 響應式設計

## 授權

MIT License 
