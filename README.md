# 巴黎瑪黑區導覽網站 | Paris Le Marais Guide

這是一個關於巴黎瑪黑區（Le Marais）及其周邊地區的互動式導覽網站。網站提供景點介紹、美食推薦和購物指南，並包含互動地圖功能。

## 專案結構

```
├── index.html          # 首頁
├── marais.html         # 瑪黑區景點介紹
├── surroundings.html   # 周邊景點介紹
├── map.html           # 互動地圖
├── spots.html         # 景點詳細資訊
├── styles.css         # 全域樣式
├── map.js            # 地圖相關功能
└── README.md         # 專案說明文件
```

## 功能特點

- 響應式設計，支援各種設備
- 互動式地圖，支援景點篩選
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

## 待開發功能

1. 路線規劃功能
2. 多語言支援
3. 景點評分系統
4. 離線地圖支援
5. 整合公共交通資訊
6. 添加更多周邊景點
7. 優化移動端體驗
8. 添加景點照片庫

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