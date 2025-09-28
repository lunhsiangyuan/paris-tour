# 🌐 網路搜尋與 AI 分析 Agent

## 🎯 工作目標
這個 Agent 專門負責**搜尋網路資料**，然後使用 **GPT-5 LLM** 進行深度思考和分析，最終產生專業的 **HTML 格式報告**。特別專精於**前列腺癌研究**、**PHI (Prostate Health Index)** 相關文獻分析和**醫療科技趨勢**研究。

## 🔍 核心功能

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
# 執行網路搜尋和分析
python3 browser/web_search_agent.py --topic "PSA screening guidelines" --output reports/

# 指定搜尋深度
python3 browser/web_search_agent.py --topic "prostate cancer treatment" --depth comprehensive

# 自定義分析角度
python3 browser/web_search_agent.py --topic "AI in healthcare" --perspective clinical
```

### 進階選項
```bash
# 多語言搜尋
python3 browser/web_search_agent.py --topic "前列腺癌篩檢" --languages zh-tw,en

# 時間範圍限制
python3 browser/web_search_agent.py --topic "COVID-19 treatment" --date-range "2024-01-01,2024-12-31"

# 特定來源
python3 browser/web_search_agent.py --topic "medical research" --sources pubmed,scholar
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

### 4. 市場分析
- **產業動態**: 醫療產業發展趨勢
- **投資機會**: 醫療科技投資分析
- **競爭環境**: 市場競爭格局分析
- **政策影響**: 政策對產業的影響
- **成本效益**: 醫療技術的成本效益分析

### 5. 新聞事件分析
- **突發事件**: 醫療相關突發事件分析
- **政策變化**: 醫療政策變化影響
- **重大發現**: 醫學重大發現和突破
- **公共衛生**: 公共衛生事件分析
- **學術會議**: 重要醫學會議和研究發表

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

### 範例 1: PHI 研究文獻分析
```bash
python3 browser/web_search_agent.py \
    --topic "Prostate Health Index PHI research 2020-2025" \
    --depth comprehensive \
    --output reports/phi_research_analysis.html \
    --analysis-type clinical
```

### 範例 2: PHID 診斷效能分析
```bash
python3 browser/web_search_agent.py \
    --topic "PHI density PHID diagnostic performance" \
    --languages en,zh-tw \
    --date-range "2020-01-01,2025-12-31" \
    --output reports/phid_diagnostic_analysis.html
```

### 範例 3: 台灣前列腺癌研究趨勢
```bash
python3 browser/web_search_agent.py \
    --topic "Taiwan prostate cancer research PHI" \
    --sources pubmed,scholar,medical-news \
    --perspective research \
    --output reports/taiwan_prostate_research.html
```

### 範例 4: PI-RADS 與 PHI 整合應用
```bash
python3 browser/web_search_agent.py \
    --topic "PI-RADS PHI combination prostate cancer diagnosis" \
    --depth expert \
    --output reports/pirads_phi_integration.html
```

### 範例 5: 前列腺癌篩檢指南更新
```bash
python3 browser/web_search_agent.py \
    --topic "prostate cancer screening guidelines 2024" \
    --languages en,zh-tw \
    --date-range "2024-01-01,2024-12-31" \
    --output reports/prostate_screening_guidelines.html
```

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

### 報告品質
- **結構清晰**: 確保報告結構清晰易懂
- **視覺美觀**: 提供美觀的視覺呈現
- **互動性**: 增加報告的互動性
- **可讀性**: 確保內容易於閱讀和理解

## 📁 現有檔案說明

### 核心檔案
- **`web_search_agent.py`**: 主要的網路搜尋與分析 Agent 程式
- **`agents.md`**: 本說明文件，詳細描述 Agent 功能和使用方式
- **`PHI_papers_2020-2025.md`**: PHI 相關研究論文摘要 (2020-2025)
- **`PHI_papers_2020-2025.html`**: PHI 研究論文的 HTML 格式報告
- **`PHI_prostate_report.html`**: 台灣前列腺癌研究綜合報告

### 資料夾結構
```
browser/
├── web_search_agent.py          # 主要 Agent 程式
├── agents.md                    # 功能說明文件
├── PHI_papers_2020-2025.md     # PHI 論文摘要
├── PHI_papers_2020-2025.html   # PHI 論文 HTML 報告
├── PHI_prostate_report.html    # 台灣前列腺癌研究報告
└── 20250922papers/             # 論文 PDF 檔案資料夾
    └── [35 個 PDF 檔案]
```

### 特色功能
- **PHI 專精**: 專門針對 Prostate Health Index 相關研究
- **台灣研究**: 特別關注台灣本土化研究結果
- **文獻分析**: 系統性分析 2020-2025 年的最新研究
- **HTML 報告**: 產生美觀的網頁格式報告
- **多語言支援**: 支援中英文文獻搜尋和分析

---

## 🚀 開始使用

1. **環境設定**: 安裝必要的 Python 套件和 API 金鑰
2. **執行搜尋**: 使用指令執行網路搜尋和分析
3. **檢視報告**: 開啟產生的 HTML 報告
4. **分享結果**: 將報告分享給相關人員

**注意**: 所有報告都會自動儲存在指定目錄中，並包含時間戳記以便版本管理。報告採用現代化的響應式設計，支援各種設備和瀏覽器。

### 快速開始
```bash
# 分析 PHI 相關最新研究
python3 browser/web_search_agent.py --topic "PHI prostate cancer 2024"

# 產生台灣前列腺癌研究報告
python3 browser/web_search_agent.py --topic "Taiwan prostate cancer research"
```
