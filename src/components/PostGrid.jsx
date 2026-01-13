import { PostCard } from "./PostCard";
import './PostGrid.css';

export function PostGrid({ posts, layout }) {
  return (
    <div className="post-grid">
      {posts.map((post) => (
          < PostCard
            key={post.id}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
            coverImage={post.coverImage}
            slug={post.slug}
            layout={layout}
          />
        ))}
    </div>
  );
}