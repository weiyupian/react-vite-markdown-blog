/**
 * 文件职责：
 * 1. 渲染右侧“推荐阅读”列表。
 * 2. 只展示被标记为推荐的文章（默认最多 3 条）。
 *
 * 依赖模块：
 * - useRecommendedPosts：读取推荐文章数据。
 * - react-router 的 Link：跳转到详情页。
 * - TailwindCSS：通过 className 管理样式。
 *
 * 谁会使用它：
 * - MainContent 的侧栏区域会使用它。
 */

import { Link } from "react-router";
import { useRecommendedPosts } from "../../hooks/useRecommendedPosts";

/**
 * RecommendedPosts 组件作用：
 * - 以简洁列表形式展示推荐文章标题。
 *
 * 关键变量：
 * - recommendedPosts：推荐文章数组。
 */
export function RecommendedPosts() {
  const recommendedPosts = useRecommendedPosts();

  // 没有推荐内容时，不渲染该区块
  if (recommendedPosts.length === 0) return null;

  return (
    <div className="flex flex-col text-right">
      <h2 className="mt-0 text-[20px]">推荐阅读</h2>

      {recommendedPosts.map((post) => (
        <div key={post.id} className="pb-[10px] leading-[16px]">
          <Link
            to={`/post/${post.slug}`}
            className="cursor-pointer text-[14px] text-[rgb(187,92,92)] no-underline hover:underline"
          >
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
