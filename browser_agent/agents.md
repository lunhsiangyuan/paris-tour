# 🌍 旅遊景點查詢與周邊介紹 Agent

## 🎯 工作目標
這個 Agent 專門負責**搜尋旅遊景點資料**，然後使用 **GPT-5 LLM** 進行深度思考和分析，最終產生專業的 **HTML 格式報告**。特別專精於**旅遊景點介紹**、**周邊景點推薦**、**交通資訊**和**旅遊攻略**研究。

## 🔍 核心功能

### 1. 網路資料搜尋
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

### 3. HTML 報告產生
- **現代化設計**: 響應式、美觀的網頁格式
- **結構化內容**: 清晰的章節組織和導航
- **視覺化元素**: 地圖、景點圖片、互動式元素
- **專業呈現**: 適合分享和展示的格式
- **旅遊報告**: 專為旅遊景點介紹設計的報告格式

## 🛠️ 技術架構

### 搜尋引擎整合
```python
# Firecrawl MCP 伺服器配置
[mcp_servers.firecrawl-mcp]
command = "env"
args = [
  "FIRECRAWL_API_KEY=fc-6a2f115106ad4c83a2f4519158cd9b48",
  "npx",
  "-y",
  "firecrawl-mcp"
]

# 支援的搜尋功能
- 網頁爬取 (scrape)
- 網站映射 (map)
- 搜尋引擎查詢 (search)
- 內容提取 (extract)
- 批量處理 (crawl)
```

### GPT-5 模型配置
```toml
# ~/.codex/config.toml
model = "gpt-5-codex"
model_reasoning_effort = "high"
web_search = true
```

### 瀏覽器工具整合
```python
# Browser Tools MCP 伺服器
[mcp_servers.browser-tools]
command = "npx"
args = ["@agentdeskai/browser-tools-mcp@latest"]

# 功能包括
- 截圖和視覺化
- 控制台日誌檢查
- 網路請求監控
- 效能和 SEO 審計
```

## 📋 工作流程

### Phase 1: 搜尋策略制定
```python
def create_search_strategy(topic, requirements):
    """
    根據主題和需求制定搜尋策略
    
    Args:
        topic: 搜尋主題
        requirements: 分析需求
    
    Returns:
        search_plan: 搜尋計劃
    """
    search_plan = {
        'primary_searches': [
            f"{topic} latest research 2024",
            f"{topic} clinical trials",
            f"{topic} guidelines recommendations"
        ],
        'secondary_searches': [
            f"{topic} news updates",
            f"{topic} expert opinions",
            f"{topic} case studies"
        ],
        'academic_sources': [
            "PubMed", "Google Scholar", "ResearchGate"
        ],
        'news_sources': [
            "Medical News Today", "WebMD", "Healthline"
        ]
    }
    return search_plan
```

### Phase 2: 資料收集
```python
def collect_web_data(search_plan):
    """
    執行網路資料收集
    
    Returns:
        raw_data: 原始搜尋結果
    """
    collected_data = []
    
    for search_query in search_plan['primary_searches']:
        # 使用 Firecrawl 搜尋
        results = firecrawl_search(
            query=search_query,
            limit=10,
            sources=["web", "news"],
            scrapeOptions={
                "formats": ["markdown"],
                "onlyMainContent": True
            }
        )
        collected_data.extend(results)
    
    return collected_data
```

### Phase 3: GPT-5 分析
```python
def gpt5_analysis(raw_data, analysis_prompt):
    """
    使用 GPT-5 進行深度分析
    
    Args:
        raw_data: 原始搜尋資料
        analysis_prompt: 分析提示
    
    Returns:
        analysis_result: 分析結果
    """
    analysis_prompt = f"""
    請基於以下搜尋結果進行深度分析：
    
    搜尋資料：
    {raw_data}
    
    分析要求：
    1. 資料可信度評估
    2. 主要發現總結
    3. 趨勢分析
    4. 批判性思考
    5. 實用建議
    6. 未來展望
    
    請提供結構化的分析報告。
    """
    
    # 調用 GPT-5 進行分析
    analysis_result = gpt5_complete(
        prompt=analysis_prompt,
        model="gpt-5-codex",
        reasoning_effort="high"
    )
    
    return analysis_result
```

### Phase 4: HTML 報告產生
```python
def generate_html_report(analysis_result, metadata):
    """
    產生 HTML 格式報告
    
    Args:
        analysis_result: GPT-5 分析結果
        metadata: 報告元資料
    
    Returns:
        html_report: HTML 報告檔案路徑
    """
    html_template = """
    <!DOCTYPE html>
    <html lang="zh-TW">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{ title }}</title>
        <style>
            /* 現代化 CSS 樣式 */
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #333;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .content {
                padding: 30px;
            }
            .section {
                margin-bottom: 30px;
                padding: 20px;
                border-radius: 10px;
                border-left: 5px solid #667eea;
                background: #f8f9ff;
            }
            .insight-box {
                background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
                padding: 20px;
                border-radius: 10px;
                margin: 15px 0;
                border-left: 5px solid #ff6b6b;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🌐 {{ title }}</h1>
                <p>生成時間: {{ timestamp }}</p>
                <p>分析主題: {{ topic }}</p>
            </div>
            
            <div class="content">
                {{ analysis_content }}
            </div>
        </div>
    </body>
    </html>
    """
    
    # 渲染 HTML 內容
    html_content = render_template(html_template, {
        'title': metadata['title'],
        'timestamp': metadata['timestamp'],
        'topic': metadata['topic'],
        'analysis_content': analysis_result
    })
    
    # 儲存 HTML 檔案
    report_path = f"web_analysis_report_{metadata['timestamp']}.html"
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    return report_path
```

## 🚀 使用方式

### 基本指令
```bash
# 執行景點搜尋和分析
python3 browser/web_search_agent.py --topic "巴黎鐵塔" --output reports/

# 指定搜尋深度
python3 browser/web_search_agent.py --topic "羅浮宮" --depth comprehensive

# 自定義分析角度
python3 browser/web_search_agent.py --topic "巴黎聖母院" --perspective cultural
```

### 進階選項
```bash
# 多語言搜尋
python3 browser/web_search_agent.py --topic "巴黎景點" --languages zh-tw,en

# 時間範圍限制
python3 browser/web_search_agent.py --topic "巴黎旅遊" --date-range "2024-01-01,2024-12-31"

# 特定來源
python3 browser/web_search_agent.py --topic "巴黎美食" --sources tripadvisor,google-maps
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

## 📋 分析檢查清單

### ✅ 搜尋階段
- [ ] 搜尋策略制定
- [ ] 多源資料收集
- [ ] 資料品質檢查
- [ ] 內容去重和清理

### ✅ 分析階段
- [ ] GPT-5 深度分析
- [ ] 可信度評估
- [ ] 偏見檢測
- [ ] 洞察生成

### ✅ 報告階段
- [ ] HTML 格式生成
- [ ] 視覺化元素添加
- [ ] 響應式設計
- [ ] 互動功能實現

## 🎨 HTML 報告範本

### 報告結構
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>網路搜尋分析報告</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <!-- 標題區域 -->
        <header class="report-header">
            <h1>🌐 網路搜尋分析報告</h1>
            <div class="metadata">
                <span class="topic">分析主題: {{ topic }}</span>
                <span class="timestamp">生成時間: {{ timestamp }}</span>
                <span class="sources">資料來源: {{ source_count }} 個</span>
            </div>
        </header>
        
        <!-- 執行摘要 -->
        <section class="executive-summary">
            <h2>📋 執行摘要</h2>
            <div class="summary-content">
                {{ executive_summary }}
            </div>
        </section>
        
        <!-- 主要發現 -->
        <section class="key-findings">
            <h2>🔍 主要發現</h2>
            <div class="findings-grid">
                {{ key_findings }}
            </div>
        </section>
        
        <!-- 深度分析 -->
        <section class="deep-analysis">
            <h2>🧠 GPT-5 深度分析</h2>
            <div class="analysis-content">
                {{ gpt5_analysis }}
            </div>
        </section>
        
        <!-- 可信度評估 -->
        <section class="credibility-assessment">
            <h2>✅ 可信度評估</h2>
            <div class="credibility-metrics">
                {{ credibility_metrics }}
            </div>
        </section>
        
        <!-- 建議和展望 -->
        <section class="recommendations">
            <h2>💡 建議和展望</h2>
            <div class="recommendations-content">
                {{ recommendations }}
            </div>
        </section>
        
        <!-- 資料來源 -->
        <section class="sources">
            <h2>📚 資料來源</h2>
            <div class="sources-list">
                {{ sources_list }}
            </div>
        </section>
    </div>
    
    <script src="interactive.js"></script>
</body>
</html>
```

## 🎯 使用範例

### 範例 1: 巴黎鐵塔詳細介紹
```bash
python3 browser/web_search_agent.py \
    --topic "巴黎鐵塔 Eiffel Tower 介紹" \
    --depth comprehensive \
    --output reports/eiffel_tower_analysis.html \
    --analysis-type cultural
```

### 範例 2: 羅浮宮周邊景點分析
```bash
python3 browser/web_search_agent.py \
    --topic "羅浮宮周邊景點 Louvre Museum surroundings" \
    --languages en,zh-tw \
    --date-range "2024-01-01,2024-12-31" \
    --output reports/louvre_surroundings_analysis.html
```

### 範例 3: 巴黎瑪黑區旅遊攻略
```bash
python3 browser/web_search_agent.py \
    --topic "巴黎瑪黑區 Le Marais 旅遊攻略" \
    --sources tripadvisor,google-maps,official-tourism \
    --perspective travel \
    --output reports/le_marais_travel_guide.html
```

### 範例 4: 巴黎美食與餐廳推薦
```bash
python3 browser/web_search_agent.py \
    --topic "巴黎美食推薦 Paris food recommendations" \
    --depth expert \
    --output reports/paris_food_guide.html
```

### 範例 5: 巴黎交通與住宿資訊
```bash
python3 browser/web_search_agent.py \
    --topic "巴黎交通住宿 Paris transportation accommodation" \
    --languages en,zh-tw \
    --date-range "2024-01-01,2024-12-31" \
    --output reports/paris_transportation_guide.html
```

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

### 報告品質
- **結構清晰**: 確保報告結構清晰易懂
- **視覺美觀**: 提供美觀的視覺呈現
- **互動性**: 增加報告的互動性
- **可讀性**: 確保內容易於閱讀和理解

## 📁 現有檔案說明

### 核心檔案
- **`web_search_agent.py`**: 主要的旅遊景點搜尋與分析 Agent 程式
- **`agents.md`**: 本說明文件，詳細描述 Agent 功能和使用方式
- **`paris_attractions.md`**: 巴黎景點相關資料摘要
- **`paris_attractions.html`**: 巴黎景點的 HTML 格式報告
- **`paris_travel_guide.html`**: 巴黎旅遊綜合攻略報告

### 資料夾結構
```
browser/
├── web_search_agent.py          # 主要 Agent 程式
├── agents.md                    # 功能說明文件
├── paris_attractions.md         # 巴黎景點摘要
├── paris_attractions.html       # 巴黎景點 HTML 報告
├── paris_travel_guide.html      # 巴黎旅遊攻略報告
└── travel_resources/            # 旅遊資源檔案資料夾
    └── [景點圖片、地圖、交通資訊等]
```

### 特色功能
- **旅遊專精**: 專門針對旅遊景點和周邊介紹
- **巴黎研究**: 特別關注巴黎地區的景點和旅遊資訊
- **景點分析**: 系統性分析景點的歷史、文化、交通等資訊
- **HTML 報告**: 產生美觀的網頁格式報告
- **多語言支援**: 支援中英文旅遊資訊搜尋和分析

---

## 🚀 開始使用

1. **環境設定**: 安裝必要的 Python 套件和 API 金鑰
2. **執行搜尋**: 使用指令執行網路搜尋和分析
3. **檢視報告**: 開啟產生的 HTML 報告
4. **分享結果**: 將報告分享給相關人員

**注意**: 所有報告都會自動儲存在指定目錄中，並包含時間戳記以便版本管理。報告採用現代化的響應式設計，支援各種設備和瀏覽器。

### 快速開始
```bash
# 分析巴黎鐵塔相關資訊
python3 browser/web_search_agent.py --topic "巴黎鐵塔 Eiffel Tower 2024"

# 產生巴黎旅遊攻略報告
python3 browser/web_search_agent.py --topic "巴黎旅遊 Paris travel guide"
```
