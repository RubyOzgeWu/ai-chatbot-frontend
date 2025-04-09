# AI Chatbot Frontend (React + Next.js)

這是 AI Chatbot 的前端專案，使用 React 與 Next.js 構建，並整合 3D 效果與自訂 UI 元件。

## 📁 資料夾結構

```
├── public/                      # 公用靜態資源（圖片、SVG 等）
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   └── app/
│       ├── ThemeProvider.tsx    # 全域主題樣式提供器
│       ├── components/          # UI 元件
│       │   ├── Background.tsx
│       │   ├── basic/           # 基本 UI 元件
│       │   │   ├── button/
│       │   │   │   ├── Button.module.css
│       │   │   │   └── Button.tsx
│       │   │   ├── card/
│       │   │   │   └── Card.tsx
│       │   │   └── input/
│       │   │       ├── Input.module.css
│       │   │       └── Input.tsx
│       │   └── three/           # Three.js 元件
│       │       ├── BackgroundParticles.tsx
│       │       └── IcosahedronGeometry.tsx
│       ├── favicon.ico
│       ├── features/            # 功能模組（可擴充）
│       ├── hooks/               # 自訂 hook
│       ├── layout.tsx           # 頁面佈局設定
│       ├── lib/                 # 公用工具函式
│       ├── page.module.css
│       ├── page.tsx             # 首頁
│       ├── styles/              # 全域樣式
│       │   ├── global.css
│       │   ├── main.css
│       │   └── variables.css
│       └── three/
│           └── page.tsx         # three.js 整合頁面
└── tsconfig.json                # TypeScript 設定檔
```

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 啟動開發伺服器

```bash
npm run dev
```

預設會在 `http://localhost:3000` 啟動。

## ✨ 技術特色

- **Next.js 13 App Router 架構**
- **自訂 UI 元件（Button、Input、Card 等）**
- **Three.js 粒子特效與 3D 幾何渲染**
- **模組化設計，易於擴充維護**
- **CSS Modules + 全域樣式設定**

## 🔌 可整合後端

可與 FastAPI 或 Node.js 後端 API 整合，打造完整的 AI Chatbot 應用。

---

