/**
 * 文件职责：
 * 1. 根据 slug 在文章数组中查找对应文章。
 * 2. 用 useMemo 缓存查找结果。
 *
 * 依赖模块：
 * - React 的 useMemo。
 *
 * 谁会使用它：
 * - PostDetail 页面。
 */

import { useMemo } from 'react';
import type { Post } from "../data/postTypes";

/**
 * usePostBySlug 作用：
 * - 返回匹配 slug 的文章对象。
 * - 找不到时返回 null。
 *
 * 关键变量：
 * - posts：文章数组。
 * - slug：路由参数中的文章唯一标识。
 */
export function usePostBySlug(posts: Post[], slug?: string): Post | null {
  return useMemo(() => {
    if (!posts || !slug) return null;
    return posts.find((p) => p.slug === slug) || null;
  }, [posts, slug]);
}
