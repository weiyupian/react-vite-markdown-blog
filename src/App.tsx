/**
 * 文件职责：
 * 1. 管理全站路由（首页、分类页、详情页、404）。
 * 2. 注入全局行为组件（错误边界、路由切换滚动到顶部）。
 * 3. 把统一导航数据传给页面组件。
 *
 * 依赖模块：
 * - react-router：Routes / Route 用来定义路由规则。
 * - HomePage / PostDetail：页面组件。
 * - ScrollToTop：路径变化时自动回到页面顶部。
 * - ErrorBoundary：页面出现渲染错误时做兜底。
 * - NAV_LINKS：统一导航配置数据。
 *
 * 谁会使用它：
 * - main.tsx 会渲染这个根组件。
 */

import { Routes, Route } from 'react-router';
import './App.css'
import { HomePage } from './pages/HomePage';
import { PostDetail } from './pages/PostDetail';
import { ScrollToTop } from './components/features/ScrollToTop'
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { NAV_LINKS } from './data/categoryConfig';

/**
 * App 组件作用：
 * - 作为应用根组件，组织全局容器和路由。
 */
function App() {
  return (
    <ErrorBoundary>
      {/* 监听路径变化后自动滚动到顶部 */}
      <ScrollToTop />
      <Routes>
        {/* 首页：展示全部文章 */}
        <Route path="/" element={<HomePage links={NAV_LINKS} />} />

        {/* 分类页：根据 URL 分类参数展示对应文章 */}
        <Route path="category/:categoryName" element={<HomePage links={NAV_LINKS} />} />

        {/* 详情页：根据 slug 展示文章全文 */}
        <Route path="post/:slug" element={<PostDetail links={NAV_LINKS} />} />

        {/* 404：未匹配到路由时展示兜底页面 */}
        <Route path="*" element={<div>页面不存在</div>} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
