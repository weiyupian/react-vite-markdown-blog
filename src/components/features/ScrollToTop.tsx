/**
 * 文件职责：
 * 1. 监听页面路由变化。
 * 2. 每次切页后把滚动条回到顶部，提升阅读体验。
 *
 * 依赖模块：
 * - useLocation：拿到当前路径 pathname。
 * - useEffect：在路径变化时执行滚动逻辑。
 *
 * 谁会使用它：
 * - App 根组件会挂载它，确保全站生效。
 */

import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * ScrollToTop 组件作用：
 * - 这是一个“行为组件”，不负责显示 UI。
 */
export function ScrollToTop() {
  // 当前路由路径，例如 "/post/react-hooks-guide"
  const { pathname } = useLocation();

  // 只要 pathname 变化，就把页面滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 不渲染任何可见内容
  return null;
}
