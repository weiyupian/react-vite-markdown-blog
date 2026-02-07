/**
 * 文件职责：
 * 1. 负责文章列表分页显示。
 * 2. 渲染分页按钮并处理上一页/下一页/跳页操作。
 *
 * 依赖模块：
 * - PostGrid：展示当前页的文章卡片列表。
 * - usePagination：提供分页状态与分页操作方法。
 * - TailwindCSS：通过 className 管理分页样式。
 *
 * 谁会使用它：
 * - MainContent 会使用它来展示首页/分类页文章列表。
 */

import { PostGrid } from '../content/PostGrid';
import { usePagination } from '../../hooks/usePagination';
import type { Post } from "../../data/postTypes";

type PaginatedPostGridProps = {
  posts: Post[];
};

/**
 * PaginatedPostGrid 组件作用：
 * - 接收完整文章数组 posts。
 * - 内部根据 pageSize 切分成多页展示。
 *
 * 关键变量：
 * - currentPage：当前页码。
 * - totalPages：总页数。
 * - pageItems：当前页对应的文章数组。
 */
export function PaginatedPostGrid({ posts }: PaginatedPostGridProps) {
  const {
    currentPage,
    totalPages,
    pageItems,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination(posts, {
    // 每页显示 6 篇
    pageSize: 6,

    // 切页后滚动到顶部，避免用户停在很低的位置
    onPageChange: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  });

  // 当前分类没有文章时，显示提示文案
  if (posts.length === 0) {
    return <div className="flex max-w-[1100px] flex-col items-center">这个分类还没有文章。</div>;
  }

  return (
    <div className="flex max-w-[1100px] flex-col items-center">
      <PostGrid posts={pageItems} />

      {/* 只有大于 1 页时才显示分页按钮 */}
      {totalPages > 1 && (
        <div className="mt-[-30px] flex flex-row gap-[5px]">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="cursor-pointer border-none bg-white text-[17px] text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            上一页
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            const isActive = currentPage === page;

            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={[
                  "cursor-pointer border-none bg-white text-[17px] text-black",
                  isActive ? "text-[rgb(166,22,22)]" : "",
                ].join(" ")}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="cursor-pointer border-none bg-white text-[17px] text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  );
}
