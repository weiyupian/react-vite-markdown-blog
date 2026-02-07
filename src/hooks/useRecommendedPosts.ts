/**
 * 文件职责：
 * 1. 提供“推荐文章列表”的读取能力。
 * 2. 把截断数量逻辑集中在 Hook 里。
 *
 * 依赖模块：
 * - getRecommended（数据服务层函数）。
 *
 * 谁会使用它：
 * - RecommendedPosts 组件。
 */

import { getRecommended } from "../data/postService";

/**
 * useRecommendedPosts 作用：
 * - 返回推荐文章数组，并按 limit 截断长度。
 *
 * 关键变量：
 * - limit：最多返回多少条推荐文章，默认 3。
 * - excludeSlug：可选，传入后会排除当前文章，避免“推荐自己”。
 */
type UseRecommendedPostsOptions = {
  limit?: number;
  excludeSlug?: string;
};

export function useRecommendedPosts(options: UseRecommendedPostsOptions = {}) {
  const { limit = 3, excludeSlug } = options;

  return getRecommended()
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, limit);
}
