import { Routes, Route } from 'react-router';
import './App.css'
import { HomePage } from './pages/HomePage';
import { posts } from './data/posts.js';
import { PostDetail } from './pages/PostDetail.jsx';
import { ScrollToTop } from './components/ScrollToTop.jsx'

function App() {
  const links = [
    { label: "全部文章", to: "/" },
    { label: "编程", to: "/category/programming" },
    { label: "电商", to: "/category/ecommerce" },
    { label: "英语", to: "/category/english" },
    { label: "自媒体", to: "/category/media" },
  ];

  return (
    <>
      <ScrollToTop /> {/* 放在这里，它会监听所有路由变化 */}
      <Routes>
        {/* 1. 首页：展示所有文章 */}
        <Route path="/" element={<HomePage posts={posts} links={links} />} />

        {/* 2. 分类页：展示特定分类的文章 (动态匹配) */}
        <Route path="category/:categoryName" element={<HomePage posts={posts} links={links} />} />

        {/* 3. 详情页：根据 slug 展示单篇文章 (动态匹配) */}
        <Route path="post/:slug" element={<PostDetail posts={posts} links={links} />} />

        {/* 4. 404 页面：路径输错时的兜底 (可选) */}
        <Route path="*" element={<div>页面不存在</div>} />
      </Routes>
    </>
  )
}

export default App
