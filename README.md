# Blog React（Vite + React + TypeScript + Tailwind CSS）

一个基于 Markdown 的个人博客项目。  
当前版本已完成从 JS 迁移到 TS，并使用 Tailwind CSS 作为主要样式方案。

## 技术栈

- Vite 7
- React 19
- TypeScript 5
- Tailwind CSS 3
- React Router 7
- React Markdown
- js-yaml（解析 front-matter）
- ESLint 9（含 TypeScript 规则）

## 主要功能

- Markdown 文章驱动（`src/data/content/*.md`）
- 首页/分类页/详情页路由
- 文章分页展示
- 推荐文章展示
- 文章详情 Markdown 渲染
- 文章底部邮件反馈入口（`mailto`）
- 错误边界与路由切换自动回到顶部

## 目录结构（核心）

```text
src/
├── components/
│   ├── content/      # 文章相关组件（PostCard/PostGrid/MailReply 等）
│   ├── features/     # 功能组件（分页、ScrollToTop）
│   ├── layout/       # 布局组件（Header/Footer/Layout/NavLinks）
│   └── ui/           # 通用 UI（ErrorBoundary）
├── data/
│   ├── content/      # Markdown 文章
│   ├── categoryConfig.ts
│   ├── postService.ts
│   └── postTypes.ts
├── hooks/            # 业务 hooks（usePosts/usePagination 等）
├── pages/            # 页面组件（HomePage/PostDetail）
├── App.tsx
└── main.tsx
```

## 本地运行

1. 安装依赖

```bash
npm install
```

2. 启动开发环境

```bash
npm run dev
```

3. 打包生产版本

```bash
npm run build
```

4. 本地预览生产包

```bash
npm run preview
```

## 可用脚本

- `npm run dev`：启动开发服务器
- `npm run build`：构建生产包
- `npm run preview`：预览生产包
- `npm run lint`：运行 ESLint
- `npm run typecheck`：运行 TypeScript 类型检查

## 文章内容规范（Markdown）

文章文件放在：`src/data/content/`

front-matter 示例：

```md
---
title: React Hooks 完全指南：从入门到精通
slug: react-hooks-guide
category: programming
date: "2026-01-06"
cover: your-cover-image.png
excerpt: 这是一段摘要
isRecommended: true
---
```

字段说明：

- `title`：文章标题（必填）
- `slug`：路由唯一标识（必填）
- `category`：分类（必填，仅支持下方 4 个）
- `date`：日期（必填，推荐字符串格式）
- `cover`：封面图片文件名（可选）
- `excerpt`：摘要（可选）
- `isRecommended`：是否推荐（可选，默认 `false`）

分类可选值：

- `programming`
- `ecommerce`
- `english`
- `media`

## 图片资源说明

- 文章封面图建议放在 `public/image/`
- `cover` 字段只写文件名，例如 `cover: my-post.png`
- 页面会按 `/image/${cover}` 访问图片

## 路由说明

- `/`：全部文章
- `/category/:categoryName`：分类页
- `/post/:slug`：文章详情页

说明：

- 非法分类会自动重定向回首页
- 未匹配路由显示「页面不存在」

## 维护建议

- 新增文章后先运行 `npm run typecheck && npm run lint`
- 提交前至少跑一次 `npm run build`
- 如需新增分类，请同步修改：
  - `src/data/categoryConfig.ts`
  - 各文章 front-matter 的 `category` 字段
