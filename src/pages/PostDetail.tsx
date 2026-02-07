/**
 * 文件职责：
 * 1. 根据 URL 中的 slug 渲染文章详情页。
 * 2. 渲染 markdown 正文内容。
 * 3. 在侧栏展示推荐文章列表。
 *
 * 依赖模块：
 * - react-router：读取路由参数（useParams）。
 * - ReactMarkdown：把 markdown 文本渲染成网页内容。
 * - usePosts / usePostBySlug / useRecommendedPosts：读取文章数据并定位当前文章与推荐文章。
 * - Header / PostGrid / MailReply：页面结构和功能组件。
 *
 * 谁会使用它：
 * - App.tsx 的 "/post/:slug" 路由会使用本页面。
 */

import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import { Header } from "../components/layout/Header";
import { PostGrid } from "../components/content/PostGrid";
import { MailReply } from "../components/content/MailReply";
import { usePosts } from "../hooks/usePosts";
import { usePostBySlug } from "../hooks/usePostBySlug";
import { useRecommendedPosts } from "../hooks/useRecommendedPosts";
import type { NavLinkItem } from "../data/categoryConfig";

type PostDetailProps = {
  links?: NavLinkItem[];
};

/**
 * PostDetail 组件作用：
 * - 显示单篇文章详细内容和推荐文章。
 *
 * 关键变量：
 * - slug：当前路由的文章唯一标识。
 * - currentPost：当前要展示的文章对象。
 * - recommendedPosts：右侧推荐文章（排除当前文章，最多 3 条）。
 */
export function PostDetail({ links = [] }: PostDetailProps) {
  // 从 URL 中读取文章 slug，例如 /post/react-hooks-guide
  const { slug } = useParams();

  // 先拿全部文章，再根据 slug 找到当前文章
  const posts = usePosts();
  const currentPost = usePostBySlug(posts, slug);

  // 推荐逻辑统一走 Hook：排除当前文章，最多显示 3 条
  const recommendedPosts = useRecommendedPosts({
    limit: 3,
    excludeSlug: slug,
  });

  const wrapperClass =
    "mx-auto box-border flex max-w-[1100px] flex-col gap-5 p-[10px] min-[640px]:flex-row";

  const contentClass =
    "min-w-0 flex-[7_1_0%] " +
    "[&_h1]:mb-[0.5em] [&_h1]:text-[2.2rem] [&_h1]:font-bold [&_h1]:text-[#1a1a1a] " +
    "[&_h2]:mb-[0.8em] [&_h2]:mt-[1.8em] [&_h2]:border-b-2 [&_h2]:border-[#f0f0f0] [&_h2]:pb-[0.3em] [&_h2]:text-[1.6rem] [&_h2]:text-[#333] " +
    "[&_p]:mb-[1.5em] [&_p]:break-words " +
    "[&_img]:mx-auto [&_img]:mb-[0.5rem] [&_img]:mt-[2rem] [&_img]:block [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-[8px] " +
    "[&_img:hover]:shadow-[0_4px_12px_rgba(0,0,0,0.05)] " +
    "[&_img+em]:mb-[2rem] [&_img+em]:block [&_img+em]:text-center [&_img+em]:text-[14px] [&_img+em]:text-[#888] " +
    "[&_img+span]:mb-[2rem] [&_img+span]:block [&_img+span]:text-center [&_img+span]:text-[14px] [&_img+span]:text-[#888] " +
    "[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-[#a00000] [&_blockquote]:bg-[#f9f9f9] [&_blockquote]:px-6 [&_blockquote]:py-[1px] [&_blockquote]:italic [&_blockquote]:leading-[1.6] [&_blockquote]:text-[#555] " +
    "[&_a]:text-[rgb(205,17,17)] [&_a]:no-underline [&_a:hover]:underline";

  const sidebarClass =
    "box-border min-w-[260px] max-w-full flex-[3_1_0%] min-[640px]:max-w-[360px]";

  // slug 不存在时，显示友好提示，而不是空白页
  if (!currentPost) {
    return (
      <>
        <Header links={links} />
        <div className={wrapperClass}>
          <div className="min-w-0 flex-[7_1_0%]">文章不存在或已被删除。</div>
        </div>
      </>
    );
  }

  // 页面主流程：头部 -> 正文区域 + 侧栏推荐
  return (
    <>
      <Header links={links} />

      <div className={wrapperClass}>
        <main className={contentClass}>
          <ReactMarkdown>{currentPost.content}</ReactMarkdown>
          <MailReply postTitle={currentPost.title} />
        </main>

        <aside className={sidebarClass}>
          <PostGrid posts={recommendedPosts} layout="compact" />
        </aside>
      </div>
    </>
  );
}
