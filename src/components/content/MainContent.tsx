/**
 * 文件职责：
 * 1. 组织首页主内容区域（文章列表 + 右侧推荐）。
 * 2. 组合 Layout、分页列表、推荐列表三个模块。
 *
 * 依赖模块：
 * - Layout：两栏布局容器。
 * - PaginatedPostGrid：带分页的文章列表。
 * - RecommendedPosts：右侧推荐阅读。
 *
 * 谁会使用它：
 * - HomePage 页面会使用它。
 */

import { PaginatedPostGrid } from "../features/PaginatedPostGrid";
import { RecommendedPosts } from "./RecommendedPosts";
import { Layout } from "../layout/Layout";
import type { Post } from "../../data/postTypes";

type MainContentProps = {
  posts: Post[];
  paginationKey: string;
};

/**
 * MainContent 组件作用：
 * - 把页面数据传给分页组件并组装侧栏。
 *
 * 关键变量：
 * - posts：当前页面要展示的文章数组。
 * - paginationKey：分类切换时用于重置分页状态的 key。
 */
export function MainContent({ posts, paginationKey }: MainContentProps) {
  return (
    <Layout sidebar={<RecommendedPosts />}>
      <PaginatedPostGrid key={paginationKey} posts={posts} />
    </Layout>
  );
}
