/**
 * 文件职责：
 * 1. 接收文章数组并批量渲染文章卡片。
 * 2. 不处理分页和筛选，只负责“列表展示”。
 *
 * 依赖模块：
 * - PostCard：单卡片渲染组件。
 * - TailwindCSS：通过 className 管理列表布局。
 *
 * 谁会使用它：
 * - PaginatedPostGrid（主列表）和 PostDetail（侧栏推荐）会使用它。
 */

import { PostCard } from "./PostCard";
import type { Post } from "../../data/postTypes";

type PostGridProps = {
  posts: Post[];
  layout?: "default" | "compact";
};

/**
 * PostGrid 组件作用：
 * - 遍历 posts 并渲染为多个 PostCard。
 *
 * 关键变量：
 * - posts：当前要展示的文章数组。
 * - layout：传给 PostCard 的展示模式。
 */
export function PostGrid({ posts, layout }: PostGridProps) {
  return (
    <div className="box-border flex w-full flex-col items-stretch">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          date={post.date}
          excerpt={post.excerpt}
          coverImage={post.coverImage}
          slug={post.slug}
          layout={layout}
        />
      ))}
    </div>
  );
}
