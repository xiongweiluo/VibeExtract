
```markdown
# 产品需求文档 (PRD)

## 1. 产品定位
针对开发者和设计师的 **AI 驱动设计提取工具**。将“观察参考网站”到“还原代码实现”的流程从数小时缩短至几分钟。

## 2. 核心功能
* **智能采集:** 输入 URL 自动生成高清截图，或手动上传本地 UI 图片。
* **语义解析:** AI 不仅提取 HEX 色值，更要理解其设计语义（如区分 `brand-primary` 与 `status-error`）。
* **实时 Playground:** * 可视化 Tokens 仪表盘。
    * 标准组件（Button, Card, Input）的实时渲染预览。
    * 原图与渲染效果的滑块对比（Comparison Slider）。
* **Vibe-Edit (自然语言调优):** 用户通过对话框指令（如“让色调更温暖些”）由 AI 实时更新 Tokens。
* **多格式导出:** 支持 Tailwind Config、CSS Variables 和标准 JSON 导出。

## 3. 用户流程 (User Flow)
1.  **输入:** 用户提交 URL 或图片。
2.  **提取:** 后端调用截图 API -> Vision API 解析 -> 返回结构化 JSON。
3.  **预览:** 自动跳转至 Playground 页面展示 Tokens 和模拟页面。
4.  **调整:** 用户通过对话或手动修改数值进行微调。
5.  **落地:** 点击导出，获取配置文件。

## 4. MVP 目标
实现从 URL 到 Tailwind 配置生成的完整闭环，准确率需达到“仅需少量人工微调即可直接使用”。