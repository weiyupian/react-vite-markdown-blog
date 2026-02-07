/**
 * 文件职责：
 * 1. 这是前端应用真正的启动入口。
 * 2. 把 React 应用挂载到 HTML 里的 #root 节点。
 * 3. 在最外层提供浏览器路由能力（BrowserRouter）。
 *
 * 依赖模块：
 * - react / react-dom：渲染组件到页面。
 * - react-router：提供路由上下文。
 * - App：应用根组件。
 *
 * 谁会使用它：
 * - Vite 在启动和打包时会从这里开始执行前端代码。
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import './index.css'
import App from './App'

// 1) 找到 index.html 里的 #root
// 2) 渲染 App 组件
// 3) 外层包裹 StrictMode 和 BrowserRouter
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
