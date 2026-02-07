/**
 * 文件职责：
 * 1. 根据分类名过滤文章数组。
 * 2. 用 useMemo 缓存结果，避免不必要重复计算。
 *
 * 依赖模块：
 * - React 的 useMemo。
 *
 * 谁会使用它：
 * - HomePage 页面。
 */

import { useMemo } from 'react';
import type { Post } from "../data/postTypes";

/**
 * useCategoryPosts 作用：
 * - 如果没有 category，返回全部 posts。
 * - 如果有 category，只返回匹配分类的文章。
 *
 * 关键变量：
 * - posts：全部文章。
 * - category：当前分类参数。
 */
export function useCategoryPosts(posts: Post[], category?: string): Post[] {
  return useMemo(() => {
    if (!category) return posts;
    return posts.filter((p) => p.category === category);
  }, [posts, category]);
}
