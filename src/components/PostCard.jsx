import { Link } from 'react-router';
import './PostCard.css';

export function PostCard({ title, date, excerpt, coverImage, slug, layout='default' }) {
  return (
    <div className={`post-card ${layout}`}>
      <Link to={`/post/${slug}`} className="post-image-wrapper">
        <img src={`/image/${coverImage}`} alt={title} className="post-image" />
      </Link>

      <div className="post-content-wrapper">
        <h3 className="post-title">
          <Link to={`/post/${slug}`} className="post-title-link">{title}</Link>
        </h3>
        <time className="post-date">{date}</time>
        <p className="post-excerpt">{excerpt}</p>
        <Link to={`/post/${slug}`} className="read-more-link">阅读全文 》</Link>
      </div>
    </div>
  );
}