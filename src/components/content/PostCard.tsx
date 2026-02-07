/**
 * 文件职责：
 * 1. 渲染单篇文章卡片（封面、标题、日期、摘要、跳转链接）。
 * 2. 支持默认样式和 compact 紧凑样式两种展示模式。
 *
 * 依赖模块：
 * - react-router 的 Link：点击后进入文章详情页。
 * - TailwindCSS：通过 className 管理卡片样式。
 *
 * 谁会使用它：
 * - PostGrid 会循环渲染多个 PostCard。
 */

import { Link } from 'react-router';
import fallbackCover from "../../assets/logo4.png";

type PostCardProps = {
  title: string;
  date: string;
  excerpt?: string;
  coverImage?: string;
  slug: string;
  layout?: "default" | "compact";
};

/**
 * PostCard 组件作用：
 * - 接收一篇文章数据并渲染成可点击卡片。
 *
 * 关键变量：
 * - slug：文章唯一链接标识（用于拼接详情页路径）。
 * - layout：卡片展示模式，"default" 或 "compact"。
 * - isCompact：是否处于紧凑模式。
 */
export function PostCard({
  title,
  date,
  excerpt,
  coverImage,
  slug,
  layout = 'default',
}: PostCardProps) {
  // 紧凑模式通常用于侧栏推荐区
  const isCompact = layout === 'compact';

  const cardClass = [
    "mb-[var(--sp-xl)] flex w-full box-border",
    isCompact
      ? "max-w-full flex-col gap-0 rounded-[var(--sp-sm)]"
      : "flex-row gap-[var(--sp-md)] max-[640px]:flex-col",
  ].join(" ");

  const titleClass = [
    "mb-0 mt-0",
    isCompact ? "text-[18px]" : "text-[22px] max-[480px]:text-[18px]",
  ].join(" ");

  const dateClass = [
    "mt-[-2px] text-[12px] text-[var(--text-muted)]",
    isCompact ? "hidden" : "",
  ].join(" ");

  const readMoreClass = [
    "no-underline font-bold",
    isCompact
      ? "text-left text-[11.5px] text-[var(--s-color)] hover:text-[var(--p-hover)]"
      : "text-right text-[var(--p-color)] hover:underline",
  ].join(" ");

  // 图片区域在默认布局下固定占比，避免 w-full 在横向 flex 中把卡片撑爆
  const mediaClass = isCompact
    ? "block w-full"
    : "block w-[42%] shrink-0 max-[640px]:w-full";

  const imageSrc = coverImage ? `/image/${coverImage}` : fallbackCover;

  return (
    <div className={cardClass}>
      <Link to={`/post/${slug}`} className={mediaClass}>
        <img
          src={imageSrc}
          alt={title}
          className="block aspect-[16/9] w-full rounded-[var(--sp-sm)] object-cover"
          loading="lazy"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <h3 className={titleClass}>
          <Link
            to={`/post/${slug}`}
            className="text-[var(--text-bold)] no-underline hover:text-[var(--p-hover)]"
          >
            {title}
          </Link>
        </h3>

        <time className={dateClass}>{date}</time>

        {!isCompact && excerpt && (
          <p className="text-[14px] text-[var(--text-main)]">{excerpt}</p>
        )}

        <Link
          to={`/post/${slug}`}
          className={readMoreClass}
        >
          阅读全文 》
        </Link>
      </div>
    </div>
  );
}
