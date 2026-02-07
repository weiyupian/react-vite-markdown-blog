/**
 * 文件职责：
 * 1. 负责首页和分类页的整体渲染。
 * 2. 从路由参数读取分类名，并筛选文章列表。
 * 3. 如果分类参数非法，自动跳回首页。
 *
 * 依赖模块：
 * - react-router：读取参数和重定向（useParams / Navigate）。
 * - usePosts：读取全部文章。
 * - useCategoryPosts：按分类过滤文章。
 * - isAllowedCategory：合法分类校验。
 * - Header / MainContent / Footer / CategoryLabel：页面结构组件。
 *
 * 谁会使用它：
 * - App.tsx 的 "/" 和 "/category/:categoryName" 两条路由会使用本页面。
 */

import { Header } from "../components/layout/Header";
import { MainContent } from "../components/content/MainContent";
import { CategoryLabel } from "../components/content/CategoryLabel";
import { Footer } from "../components/layout/Footer";
import { Navigate, useParams } from "react-router";
import { usePosts } from "../hooks/usePosts";
import { useCategoryPosts } from "../hooks/useCategoryPosts";
import { isAllowedCategory, type NavLinkItem } from "../data/categoryConfig";

type HomePageProps = {
  links?: NavLinkItem[];
};

/**
 * HomePage 组件作用：
 * - 统一处理“首页”和“分类页”这两种场景。
 *
 * 关键变量：
 * - categoryName：当前 URL 里的分类参数。
 * - posts：当前页面要展示的文章数据。
 * - isInvalidCategory：分类是否合法。
 * - paginationKey：让分页在分类切换时重置。
 */
export function HomePage({ links = [] }: HomePageProps) {
  // 从路由参数读取分类名，例如：/category/programming
  const { categoryName } = useParams();

  // 先拿到全部文章，再根据分类过滤
  const allPosts = usePosts();
  const posts = useCategoryPosts(allPosts, categoryName);

  // 如果 URL 里出现不支持的分类，就判定为非法
  const isInvalidCategory = Boolean(categoryName && !isAllowedCategory(categoryName));

  // 分类变化时，这个 key 会变化，从而让分页组件回到第 1 页
  const paginationKey = categoryName ?? "all";

  // 非法分类直接重定向到首页，避免页面出现空白或异常状态
  if (isInvalidCategory) {
    return <Navigate to="/" replace />;
  }

  // 页面主流程：头部 -> 分类标题 -> 内容区 -> 页脚
  return (
    <>
      <Header links={links} />
      <CategoryLabel category={categoryName} />
      <MainContent posts={posts} paginationKey={paginationKey} />
      <Footer links={links} />
    </>
  );
}
