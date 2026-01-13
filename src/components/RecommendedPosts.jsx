import { Link } from "react-router";
import './RecommendedPosts.css';

export function RecommendedPosts({ posts }) {
  const recommendedPosts = posts.filter(post => post.isRecommended);
  if (recommendedPosts.length === 0) return null;

  return (
    <div className="recommended-posts">
      <h2>推荐阅读</h2>
      {recommendedPosts.map((post) => (
        <div key={post.id} className="recommended-post-item">
          <Link to={`/post/${post.slug}`} className="recommended-post-link">{post.title}</Link>
        </div>
      ))}
    </div>
  );
}