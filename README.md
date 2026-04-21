# VibeExtractor 🎨🤖

## 项目简介
VibeExtractor 是一款基于大模型视觉能力（Vision LLM）的下一代 UI 设计逆向工程平台。
本项目旨在解决传统开发者和设计师在复刻优秀网页设计时，手动提取颜色、间距、字体规范耗时且难以语义化的问题。用户只需提供一个目标网站的 URL 或截图，系统即可在数秒内通过 AI 视觉解析，自动生成标准化的 Design Tokens，并在所见即所得的 Playground 中实时预览，最终支持导出为生产级别的 Tailwind CSS 或通用配置文件。

👉 [Live Demo - https://vibe-extract.vercel.app/]

## 技术栈选型
* **核心框架:** Next.js (App Router) + React
* **样式与 UI:** Tailwind CSS + Shadcn UI
* **AI 视觉大脑:** Claude 3.5 Sonnet (Vision API)
* **截图服务引擎:** ScreenshotOne API
* **部署平台:** Vercel
* **开发语言:** TypeScript

## 如何运行项目

### 1. 环境准备
确保你的本地已安装 [Node.js](https://nodejs.org/) (推荐 v18+)。

### 2. 安装依赖
```bash
npm install
# 或使用 pnpm / yarn
