import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 每次路径(pathname)发生变化时，将窗口滚动到左上角 (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 这个组件不需要渲染任何东西
}