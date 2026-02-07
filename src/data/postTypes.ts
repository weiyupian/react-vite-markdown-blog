/**
 * 文件职责：
 * 1. 把 markdown front-matter 元数据转换为项目统一 Post 对象结构。
 * 2. 作为数据层的“格式标准化”步骤。
 *
 * 依赖模块：
 * - 无外部依赖（纯数据转换函数）。
 *
 * 谁会使用它：
 * - postService 在解析 markdown 时会调用它。
 */

/**
 * createPost 作用：
 * - 把 meta + content 组合成前端页面需要的文章对象。
 *
 * 关键变量：
 * - meta：文章头部元数据（title/slug/date/category...）。
 * - content：正文 markdown 字符串。
 */
import type { CategoryKey } from "./categoryConfig";

export type PostMeta = {
  title: string;
  slug: string;
  category: CategoryKey;
  // front-matter 里的日期可能是字符串，也可能被 YAML 自动解析成 Date 对象
  date: string | Date;
  excerpt?: string;
  cover?: string;
  isRecommended?: boolean;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  category: CategoryKey;
  date: string;
  excerpt?: string;
  coverImage?: string;
  isRecommended: boolean;
  content: string;
};

export function createPost(meta: PostMeta, content: string): Post {
  const parsedDate = meta.date instanceof Date ? meta.date : new Date(meta.date);

  return {
    id: meta.slug,
    title: meta.title,
    slug: meta.slug,
    category: meta.category,
    // 统一日期格式为 YYYY-MM-DD，方便展示和排序
    date: parsedDate.toISOString().slice(0, 10),
    excerpt: meta.excerpt,
    coverImage: meta.cover,
    isRecommended: meta.isRecommended ?? false,
    content,
  };
}
