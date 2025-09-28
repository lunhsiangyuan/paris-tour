# 🌍 Browser Agent - 旅遊景點查詢與周邊介紹工具

## 📋 專案概述

`browser_agent/` 目錄包含專門用於**旅遊景點資料搜尋**、**GPT-5 LLM 深度分析**和**HTML 旅遊報告生成**的 AI 代理工具。特別專精於巴黎旅遊景點介紹、周邊景點推薦、交通資訊和旅遊攻略研究。

## 🗂️ 檔案結構

```
browser_agent/
├── README.md                    # 本說明文件
├── agents.md                    # 詳細的 Agent 功能說明文件
├── web_search_agent.py          # 主要的旅遊景點搜尋與分析 Agent 程式
├── paris_attractions.md         # 巴黎景點相關資料摘要
├── paris_attractions.html       # 巴黎景點的 HTML 格式報告
├── paris_travel_guide.html      # 巴黎旅遊綜合攻略報告
└── ollama-voice-mac/           # 語音處理相關工具
    └── whisper/                # Whisper 語音轉文字工具
```

## 🎯 核心功能

### 1. 旅遊景點資料搜尋
- **多源搜尋**: 搜尋引擎、旅遊網站、官方景點網站
- **即時資訊**: 獲取最新的景點資訊、開放時間、票價資訊
- **深度爬取**: 提取完整的景點介紹、交通資訊、周邊設施
- **多語言支援**: 中文、英文等多語言旅遊資料來源
- **旅遊平台**: 專注於 TripAdvisor、Google Maps、官方旅遊網站等

### 2. GPT-5 LLM 分析
- **深度思考**: 利用 GPT-5 的推理能力進行複雜分析
- **多角度視角**: 從不同角度審視搜尋結果
- **批判性思維**: 評估資料可信度和偏見
- **洞察生成**: 產生深層次的見解和建議
- **旅遊專業**: 特別針對旅遊景點進行專業分析

### 3. HTML 旅遊報告產生
- **現代化設計**: 響應式、美觀的網頁格式
- **結構化內容**: 清晰的章節組織和導航
- **視覺化元素**: 地圖、景點圖片、互動式元素
- **專業呈現**: 適合分享和展示的格式
- **旅遊報告**: 專為旅遊景點介紹設計的報告格式

## 🚀 快速開始

### 基本使用
```bash
# 分析巴黎鐵塔相關資訊
python3 browser_agent/web_search_agent.py --topic "巴黎鐵塔 Eiffel Tower 2024"

# 產生巴黎旅遊攻略報告
python3 browser_agent/web_search_agent.py --topic "巴黎旅遊 Paris travel guide"

# 指定輸出目錄
python3 browser_agent/web_search_agent.py --topic "羅浮宮介紹" --output-dir reports/
```

### 進階選項
```bash
# 多語言搜尋
python3 browser_agent/web_search_agent.py --topic "巴黎景點" --languages zh-tw,en

# 時間範圍限制
python3 browser_agent/web_search_agent.py --topic "巴黎美食" --date-range "2024-01-01,2024-12-31"

# 分析深度設定
python3 browser_agent/web_search_agent.py --topic "巴黎交通" --depth expert
```

## 📊 分析類型

### 1. 景點詳細介紹
- **歷史背景**: 景點的歷史沿革和文化背景
- **建築特色**: 建築風格、設計理念和藝術價值
- **開放資訊**: 開放時間、票價、參觀須知
- **最佳參觀時間**: 季節性推薦和最佳參觀時段
- **參觀路線**: 推薦的參觀路線和重點區域

### 2. 周邊景點推薦
- **鄰近景點**: 步行可達的周邊景點
- **交通便利**: 公共交通和步行路線規劃
- **一日遊路線**: 完整的周邊一日遊建議
- **主題路線**: 文化、美食、購物等主題路線
- **深度探索**: 當地人推薦的隱藏景點

### 3. 交通資訊分析
- **大眾運輸**: 地鐵、公車、火車等交通方式
- **自駕路線**: 開車路線和停車資訊
- **步行路線**: 步行距離和時間估算
- **交通費用**: 各種交通方式的費用比較
- **交通時間**: 不同時段的交通狀況分析

### 4. 旅遊攻略分析
- **最佳季節**: 不同季節的旅遊特色和注意事項
- **天氣資訊**: 當地氣候和天氣預報
- **穿著建議**: 適合的服裝和裝備建議
- **預算規劃**: 住宿、餐飲、交通費用估算
- **時間安排**: 建議的參觀時間和行程規劃

### 5. 實用資訊分析
- **住宿推薦**: 周邊住宿選擇和價格範圍
- **美食推薦**: 當地特色美食和餐廳推薦
- **購物資訊**: 紀念品和特色商品購買地點
- **語言服務**: 多語言服務和溝通建議
- **安全注意**: 旅遊安全注意事項和緊急聯絡

## 🔧 技術需求

### Python 套件
```bash
pip install requests beautifulsoup4 pandas matplotlib plotly
pip install openai anthropic
pip install jinja2 markdown
```

### API 金鑰設定
```bash
# OpenAI API (GPT-5)
export OPENAI_API_KEY="your-openai-api-key"

# Firecrawl API
export FIRECRAWL_API_KEY="fc-6a2f115106ad4c83a2f4519158cd9b48"

# 其他搜尋 API
export GOOGLE_SEARCH_API_KEY="your-google-api-key"
export BING_SEARCH_API_KEY="your-bing-api-key"
```

## 📋 使用範例

### 範例 1: 巴黎鐵塔詳細介紹
```bash
python3 browser_agent/web_search_agent.py \
    --topic "巴黎鐵塔 Eiffel Tower 介紹" \
    --depth comprehensive \
    --output-dir reports/ \
    --languages en,zh-tw
```

### 範例 2: 羅浮宮周邊景點分析
```bash
python3 browser_agent/web_search_agent.py \
    --topic "羅浮宮周邊景點 Louvre Museum surroundings" \
    --date-range "2024-01-01,2024-12-31" \
    --output-dir reports/
```

### 範例 3: 巴黎瑪黑區旅遊攻略
```bash
python3 browser_agent/web_search_agent.py \
    --topic "巴黎瑪黑區 Le Marais 旅遊攻略" \
    --depth expert \
    --output-dir reports/
```

## 📁 現有檔案說明

### 核心檔案
- **`web_search_agent.py`**: 主要的旅遊景點搜尋與分析 Agent 程式
- **`agents.md`**: 詳細的 Agent 功能說明文件
- **`paris_attractions.md`**: 巴黎景點相關資料摘要
- **`paris_attractions.html`**: 巴黎景點的 HTML 格式報告
- **`paris_travel_guide.html`**: 巴黎旅遊綜合攻略報告

### 特色功能
- **旅遊專精**: 專門針對旅遊景點和周邊介紹
- **巴黎研究**: 特別關注巴黎地區的景點和旅遊資訊
- **景點分析**: 系統性分析景點的歷史、文化、交通等資訊
- **HTML 報告**: 產生美觀的網頁格式報告
- **多語言支援**: 支援中英文旅遊資訊搜尋和分析

## 🎨 HTML 旅遊報告特色

### 報告結構
- **景點概述**: 景點基本資訊和特色介紹
- **歷史文化**: 歷史背景和文化價值分析
- **參觀資訊**: 開放時間、票價、參觀須知
- **交通指南**: 詳細的交通方式和路線規劃
- **周邊推薦**: 鄰近景點和一日遊建議
- **實用資訊**: 住宿、美食、購物、安全注意事項
- **旅遊攻略**: 最佳參觀時間和行程建議

### 視覺化元素
- **響應式設計**: 支援各種設備和螢幕尺寸
- **互動式地圖**: 景點位置和周邊設施標示
- **景點圖片**: 高品質的景點照片展示
- **現代化 UI**: 美觀的旅遊主題使用者介面
- **動畫效果**: 流暢的頁面轉場效果

## 🔍 品質控制

### 資料驗證
- **來源可信度**: 檢查旅遊網站和官方資料的權威性
- **時間新鮮度**: 確保景點資訊的時效性
- **內容完整性**: 驗證景點介紹的完整性
- **偏見檢測**: 識別潛在的商業偏見和立場

### 分析品質
- **邏輯一致性**: 確保分析邏輯的一致性
- **證據支持**: 確保結論有足夠證據支持
- **多角度視角**: 從不同角度分析問題
- **批判性思考**: 應用批判性思維

## 🚀 開始使用

1. **環境設定**: 安裝必要的 Python 套件和 API 金鑰
2. **執行搜尋**: 使用指令執行旅遊景點搜尋和分析
3. **檢視報告**: 開啟產生的 HTML 旅遊報告
4. **分享結果**: 將報告分享給相關人員

**注意**: 所有報告都會自動儲存在指定目錄中，並包含時間戳記以便版本管理。報告採用現代化的響應式設計，支援各種設備和瀏覽器。

## 📞 支援與聯絡

如有問題或建議，請透過以下方式聯絡：
- GitHub Issues
- 專案討論區
- 電子郵件

---

*最後更新: 2025-01-27*
*版本: 2.0.0 - 旅遊景點專版*