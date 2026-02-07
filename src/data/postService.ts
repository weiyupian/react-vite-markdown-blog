/**
 * 文件职责：
 * 1. 读取并解析所有 markdown 文章文件。
 * 2. 校验文章元数据完整性（title/slug/category/date）。
 * 3. 提供统一的数据查询函数（全部、按 slug、按分类、推荐）。
 *
 * 依赖模块：
 * - js-yaml：解析 front-matter（YAML 格式元数据）。
 * - createPost：把原始 meta+content 转为统一 Post 对象。
 * - ALLOWED_CATEGORIES：分类合法性校验。
 *
 * 谁会使用它：
 * - hooks 层（usePosts / useRecommendedPosts 等）会调用这里的查询函数。
 */

import yaml from "js-yaml";
import { createPost, type Post, type PostMeta } from "./postTypes";
import { ALLOWED_CATEGORIES, type CategoryKey } from "./categoryConfig";

// Vite 启动时自动收集 ./content 下所有 markdown 文件
const modules = import.meta.glob("./content/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

type MetaDraft = Partial<PostMeta> & Record<string, unknown>;

/**
 * parseMarkdown 作用：
 * - 拆分 front-matter 和正文内容。
 */
function parseMarkdown(raw: string): { meta: MetaDraft; content: string } {
  const delimiter = "---";
  const parts = raw.split(delimiter);

  if (parts.length < 3) {
    throw new Error("Markdown 缺少 front-matter");
  }

  const metaRaw = parts[1];
  const content = parts.slice(2).join(delimiter).trim();
  const parsedMeta = yaml.load(metaRaw);

  if (!parsedMeta || typeof parsedMeta !== "object") {
    throw new Error("front-matter 解析失败：不是对象格式");
  }

  return { meta: parsedMeta as MetaDraft, content };
}

/**
 * validateMeta 作用：
 * - 校验必填字段是否存在，防止渲染时出现 undefined。
 */
function validateMeta(meta: MetaDraft, fileName: string): asserts meta is PostMeta {
  const required: Array<keyof PostMeta> = ["title", "slug", "category", "date"];

  required.forEach((key) => {
    if (!meta[key]) {
      throw new Error(`文章缺少字段: ${key} (${fileName})`);
    }
  });

  if (typeof meta.title !== "string") {
    throw new Error(`文章字段类型错误: title 必须是字符串 (${fileName})`);
  }

  if (typeof meta.slug !== "string") {
    throw new Error(`文章字段类型错误: slug 必须是字符串 (${fileName})`);
  }

  if (typeof meta.category !== "string") {
    throw new Error(`文章字段类型错误: category 必须是字符串 (${fileName})`);
  }

  const isDateString = typeof meta.date === "string";
  const isDateObject = meta.date instanceof Date;
  if (!isDateString && !isDateObject) {
    throw new Error(`文章字段类型错误: date 必须是字符串或日期对象 (${fileName})`);
  }

  if (meta.excerpt && typeof meta.excerpt !== "string") {
    throw new Error(`文章字段类型错误: excerpt 必须是字符串 (${fileName})`);
  }

  if (meta.cover && typeof meta.cover !== "string") {
    throw new Error(`文章字段类型错误: cover 必须是字符串 (${fileName})`);
  }

  if (meta.isRecommended != null && typeof meta.isRecommended !== "boolean") {
    throw new Error(`文章字段类型错误: isRecommended 必须是布尔值 (${fileName})`);
  }

  let dateTime: number;
  if (meta.date instanceof Date) {
    dateTime = meta.date.getTime();
  } else {
    dateTime = new Date(meta.date).getTime();
  }

  if (Number.isNaN(dateTime)) {
    throw new Error(`文章字段格式错误: date 不是有效日期 (${fileName})`);
  }
}

/**
 * validateCategory 作用：
 * - 保证文章 category 只使用项目支持的分类。
 */
function validateCategory(
  category: string,
  fileName: string,
): asserts category is CategoryKey {
  if (!ALLOWED_CATEGORIES.includes(category as CategoryKey)) {
    throw new Error(`非法分类: ${category} (${fileName})`);
  }
}

// 构建项目启动后常驻内存的文章数组（避免重复解析文件）
const posts: Post[] = Object.entries(modules).map(([fileName, raw]) => {
  const { meta, content } = parseMarkdown(raw);
  validateMeta(meta, fileName);
  validateCategory(meta.category, fileName);
  return createPost(meta, content);
});

// ===== 对外查询函数（供 hooks/页面调用） =====

// 返回全部文章，并按日期从新到旧排序
export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// 按 slug 精确查找一篇文章
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

// 按分类筛选文章
export function getByCategory(category: CategoryKey): Post[] {
  return posts.filter((p) => p.category === category);
}

// 返回被标记为推荐的文章
export function getRecommended(): Post[] {
  // 推荐列表也保持“按日期从新到旧”顺序，和首页一致
  return getAllPosts().filter((p) => p.isRecommended);
}
