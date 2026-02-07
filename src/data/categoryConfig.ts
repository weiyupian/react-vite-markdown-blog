/**
 * 文件职责：
 * 1. 统一管理分类相关配置（分类 key、中文名、路由地址）。
 * 2. 提供“合法分类列表”和“导航链接列表”给其他模块复用。
 *
 * 依赖模块：
 * - 无外部依赖（纯配置数据）。
 *
 * 谁会使用它：
 * - App.tsx：读取 NAV_LINKS 渲染导航。
 * - HomePage / postService：读取 ALLOWED_CATEGORIES 做分类校验。
 */

export type CategoryKey = "programming" | "ecommerce" | "english" | "media";

export type NavLinkItem = {
  label: string;
  to: string;
};

type CategoryLink = {
  key: CategoryKey;
  label: string;
  to: string;
};

// 分类源数据：key 用于数据匹配，label/to 用于界面导航
const CATEGORY_LINKS: CategoryLink[] = [
  { key: "programming", label: "编程", to: "/category/programming" },
  { key: "ecommerce", label: "电商", to: "/category/ecommerce" },
  { key: "english", label: "英语", to: "/category/english" },
  { key: "media", label: "自媒体", to: "/category/media" },
];

// 只取分类 key，给校验逻辑使用
export const ALLOWED_CATEGORIES: CategoryKey[] = CATEGORY_LINKS.map(
  (item) => item.key,
);

// 生成页面导航链接（首页 + 各分类）
export const NAV_LINKS: NavLinkItem[] = [
  { label: "全部文章", to: "/" },
  ...CATEGORY_LINKS.map(({ label, to }) => ({ label, to })),
];

// 判断某个字符串是不是项目允许的分类 key
export function isAllowedCategory(value: string): value is CategoryKey {
  return ALLOWED_CATEGORIES.includes(value as CategoryKey);
}
