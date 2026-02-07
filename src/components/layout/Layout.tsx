/**
 * 文件职责：
 * 1. 提供页面通用的“主内容 + 侧栏”两栏布局。
 * 2. 让页面组件不需要重复写布局容器代码。
 *
 * 依赖模块：
 * - TailwindCSS：直接通过 className 控制两栏布局。
 *
 * 谁会使用它：
 * - MainContent 组件会使用它来包裹文章列表和推荐区。
 */

import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  sidebar?: ReactNode;
};

/**
 * Layout 组件作用：
 * - children 放主内容区域。
 * - sidebar 放右侧侧栏区域（可选）。
 *
 * 关键变量：
 * - children：主区域内容。
 * - sidebar：侧栏内容，不传则不渲染侧栏。
 */
export function Layout({ children, sidebar }: LayoutProps) {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-[30px] p-5 box-border min-[640px]:flex-row">
      <main className="min-w-0 flex-[7_1_0%]">
        {children}
      </main>

      {sidebar && (
        <aside className="min-w-[260px] max-w-full box-border flex-[3_1_0%] min-[640px]:max-w-[360px]">
          {sidebar}
        </aside>
      )}
    </div>
  );
}
