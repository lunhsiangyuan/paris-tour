# 🌐 Browser 目錄 - 網路搜尋與 AI 分析工具

## 📋 目錄概述

`browser/` 目錄包含專門用於**網路資料搜尋**、**GPT-5 LLM 深度分析**和**HTML 報告生成**的 AI 代理工具。特別專精於前列腺癌研究、PHI (Prostate Health Index) 相關文獻分析和醫療科技趨勢研究。

## 🗂️ 檔案結構

```
browser/
├── README.md                    # 本說明文件
├── agents.md                    # 詳細的 Agent 功能說明文件
├── web_search_agent.py          # 主要的網路搜尋與分析 Agent 程式
├── PHI_papers_2020-2025.md     # PHI 相關研究論文摘要 (2020-2025)
├── PHI_papers_2020-2025.html   # PHI 研究論文的 HTML 格式報告
├── PHI_prostate_report.html    # 台灣前列腺癌研究綜合報告
└── ollama-voice-mac/           # 語音處理相關工具
    └── whisper/                # Whisper 語音轉文字工具
```

## 🎯 核心功能

### 1. 網路資料搜尋
- **多源搜尋**: 搜尋引擎、學術資料庫、新聞網站
- **即時資訊**: 獲取最新的研究結果、新聞報導、技術發展
- **深度爬取**: 提取完整的網頁內容和結構化資料
- **多語言支援**: 中文、英文等多語言資料來源
- **專業文獻**: 專注於 PubMed、Google Scholar 等學術資料庫

### 2. GPT-5 LLM 分析
- **深度思考**: 利用 GPT-5 的推理能力進行複雜分析
- **多角度視角**: 從不同角度審視搜尋結果
- **批判性思維**: 評估資料可信度和偏見
- **洞察生成**: 產生深層次的見解和建議
- **醫學專業**: 特別針對醫療研究進行專業分析

### 3. HTML 報告產生
- **現代化設計**: 響應式、美觀的網頁格式
- **結構化內容**: 清晰的章節組織和導航
- **視覺化元素**: 圖表、圖像、互動式元素
- **專業呈現**: 適合分享和展示的格式
- **醫學報告**: 專為醫療研究設計的報告格式

## 🚀 快速開始

### 基本使用
```bash
# 分析 PHI 相關最新研究
python3 browser/web_search_agent.py --topic "PHI prostate cancer 2024"

# 產生台灣前列腺癌研究報告
python3 browser/web_search_agent.py --topic "Taiwan prostate cancer research"

# 指定輸出目錄
python3 browser/web_search_agent.py --topic "PSA screening guidelines" --output-dir reports/
```

### 進階選項
```bash
# 多語言搜尋
python3 browser/web_search_agent.py --topic "前列腺癌篩檢" --languages zh-tw,en

# 時間範圍限制
python3 browser/web_search_agent.py --topic "COVID-19 treatment" --date-range "2024-01-01,2024-12-31"

# 分析深度設定
python3 browser/web_search_agent.py --topic "medical research" --depth expert
```

## 📊 分析類型

### 1. 前列腺癌研究分析
- **PHI 研究**: Prostate Health Index 相關最新研究
- **PHID 分析**: PHI Density 診斷效能分析
- **PI-RADS 整合**: 與 MRI 影像檢查的結合應用
- **臨床指南**: 前列腺癌篩檢和診斷指南更新
- **台灣研究**: 本土化研究結果和臨床應用

### 2. 醫療研究分析
- **最新研究**: 搜尋最新的醫學研究論文
- **臨床指南**: 分析最新的臨床實踐指南
- **藥物資訊**: 收集藥物治療相關資訊
- **副作用**: 分析藥物副作用和安全資訊
- **文獻綜述**: 系統性文獻回顧和 Meta 分析

### 3. 技術趨勢分析
- **AI 發展**: 人工智慧在醫療領域的應用
- **新技術**: 醫療技術創新和突破
- **數位健康**: 數位化醫療解決方案
- **遠程醫療**: 遠程醫療技術發展
- **精準醫療**: 個人化醫療和基因檢測

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

### 範例 1: PHI 研究文獻分析
```bash
python3 browser/web_search_agent.py \
    --topic "Prostate Health Index PHI research 2020-2025" \
    --depth comprehensive \
    --output-dir reports/ \
    --languages en,zh-tw
```

### 範例 2: PHID 診斷效能分析
```bash
python3 browser/web_search_agent.py \
    --topic "PHI density PHID diagnostic performance" \
    --date-range "2020-01-01,2025-12-31" \
    --output-dir reports/
```

### 範例 3: 台灣前列腺癌研究趨勢
```bash
python3 browser/web_search_agent.py \
    --topic "Taiwan prostate cancer research PHI" \
    --depth expert \
    --output-dir reports/
```

## 📁 現有檔案說明

### 核心檔案
- **`web_search_agent.py`**: 主要的網路搜尋與分析 Agent 程式
- **`agents.md`**: 詳細的 Agent 功能說明文件
- **`PHI_papers_2020-2025.md`**: PHI 相關研究論文摘要 (2020-2025)
- **`PHI_papers_2020-2025.html`**: PHI 研究論文的 HTML 格式報告
- **`PHI_prostate_report.html`**: 台灣前列腺癌研究綜合報告

### 特色功能
- **PHI 專精**: 專門針對 Prostate Health Index 相關研究
- **台灣研究**: 特別關注台灣本土化研究結果
- **文獻分析**: 系統性分析 2020-2025 年的最新研究
- **HTML 報告**: 產生美觀的網頁格式報告
- **多語言支援**: 支援中英文文獻搜尋和分析

## 🎨 HTML 報告特色

### 報告結構
- **執行摘要**: 分析概述和關鍵指標
- **主要發現**: 結構化的關鍵洞察
- **可信度評估**: 資料來源可信度分析
- **趨勢分析**: 新興和穩定趨勢識別
- **實用建議**: 基於分析結果的建議
- **未來展望**: 短期、中期、長期預測
- **資料來源**: 完整的參考文獻列表

### 視覺化元素
- **響應式設計**: 支援各種設備和螢幕尺寸
- **互動式圖表**: 動態的資料視覺化
- **現代化 UI**: 美觀的使用者介面
- **動畫效果**: 流暢的頁面轉場效果

## 🔍 品質控制

### 資料驗證
- **來源可信度**: 檢查資料來源的權威性
- **時間新鮮度**: 確保資料的時效性
- **內容完整性**: 驗證資料的完整性
- **偏見檢測**: 識別潛在的偏見和立場

### 分析品質
- **邏輯一致性**: 確保分析邏輯的一致性
- **證據支持**: 確保結論有足夠證據支持
- **多角度視角**: 從不同角度分析問題
- **批判性思考**: 應用批判性思維

## 🚀 開始使用

1. **環境設定**: 安裝必要的 Python 套件和 API 金鑰
2. **執行搜尋**: 使用指令執行網路搜尋和分析
3. **檢視報告**: 開啟產生的 HTML 報告
4. **分享結果**: 將報告分享給相關人員

**注意**: 所有報告都會自動儲存在指定目錄中，並包含時間戳記以便版本管理。報告採用現代化的響應式設計，支援各種設備和瀏覽器。

## 📞 支援與聯絡

如有問題或建議，請透過以下方式聯絡：
- GitHub Issues
- 專案討論區
- 電子郵件

---

*最後更新: 2025-01-27*
*版本: 1.0.0*
