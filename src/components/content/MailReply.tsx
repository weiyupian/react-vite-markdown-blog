/**
 * 文件职责：
 * 1. 在文章底部提供“邮件反馈”入口。
 * 2. 自动拼接邮件主题和正文模板，方便读者直接回复。
 *
 * 依赖模块：
 * - 无外部业务模块依赖（纯展示 + mailto 逻辑）。
 *
 * 谁会使用它：
 * - PostDetail 页面正文下方会使用它。
 */

/**
 * MailReply 组件作用：
 * - 生成 mailto 链接，让用户点击后打开本地邮件客户端。
 *
 * 关键变量：
 * - postTitle：当前文章标题，会放进邮件主题里。
 * - subject/body：需要 URL 编码，避免中文和换行导致链接异常。
 */
type MailReplyProps = {
  postTitle: string;
};

export function MailReply({ postTitle }: MailReplyProps) {
  // 收件邮箱地址
  const email = "weiyupian@gmail.com";

  // 邮件主题（带文章标题）
  const subject = encodeURIComponent(`回复博文：${postTitle}`);

  // 邮件正文模板（预填一段提示语）
  const body = encodeURIComponent("你好，我对这篇文章有些看法：\n\n");

  return (
    <div className="mt-10 rounded-[var(--sp-sm)] border border-[var(--border-color)] bg-[var(--bg-soft)] p-4">
      <p className="mb-3 mt-0 text-[14px] text-[var(--text-main)]">对这篇文章有疑问或建议？</p>
      <a
        href={`mailto:${email}?subject=${subject}&body=${body}`}
        className="inline-block rounded-[var(--sp-sm)] bg-[var(--p-color)] px-4 py-2 text-[14px] font-semibold text-white no-underline hover:bg-[var(--p-hover)]"
      >
        通过邮件回复我
      </a>
    </div>
  );
}
