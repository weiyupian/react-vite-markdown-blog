/**
 * 文件职责：
 * 1. 提供“读取全部文章”的自定义 Hook。
 * 2. 让页面层不直接依赖数据服务细节。
 *
 * 依赖模块：
 * - getAllPosts（数据服务层函数）。
 *
 * 谁会使用它：
 * - HomePage、PostDetail 等页面组件。
 */

import { getAllPosts } from "../data/postService";

/**
 * usePosts 作用：
 * - 返回按日期排序后的全部文章数组。
 */
export function usePosts() {
  return getAllPosts();
}
