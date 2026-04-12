# 技术架构说明文档 (Architecture)

## 1. 设计哲学
* **轻量化:** 采用 Next.js Server Actions 替代独立后端，减少运维成本。
* **类型安全:** 严格使用 TypeScript 定义 Data Schema。
* **AI 友好:** 目录结构清晰，组件高度解耦，便于 AI 代码生成工具理解。

## 2. 目录结构规范
* `src/app/api`: 处理长耗时或需要流式返回的 Edge Functions。
* `src/components/playground`: 核心预览逻辑，采用状态提升管理 Tokens。
* `src/services`: 业务逻辑抽象（截图封装、LLM 提示词工程）。
* `src/types`: 统一的接口定义，所有 AI 输出必须符合 `DesignTokens` 接口。

## 3. 数据模型 (Data Schema)
```typescript
export interface DesignTokens {
  colors: {
    brand: { primary: string; secondary: string };
    background: { main: string; card: string };
    text: { base: string; muted: string };
    border: string;
  };
  spacing: { base: number; scale: string }; // e.g. 4, "rem"
  borderRadius: { small: string; medium: string; large: string };
  typography: {
    sans: string;
    headingWeight: string;
  };
}