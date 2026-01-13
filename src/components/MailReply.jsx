export function MailReply({ postTitle }) {
  const email = "weiyupian@gmail.com";
  const subject = encodeURIComponent(`回复博文：${postTitle}`);
  const body = encodeURIComponent("你好，我对这篇文章有些看法：\n\n");

  return (
    <div className="mail-reply-section">
      <p>对这篇文章有疑问或建议？</p>
      <a href={`mailto:${email}?subject=${subject}&body=${body}`} className="email-button">
        通过邮件回复我
      </a>

    </div>
  );
}