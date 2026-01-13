import { PaginatedPostGrid } from "./PaginatedPostGrid";
import { RecommendedPosts } from "./RecommendedPosts";
import './MainContent.css';

export function MainContent({ posts }) {
  return (
    <div className="main-content-wrapper">
      <div className="main-content">
        <PaginatedPostGrid posts={posts} />
        <RecommendedPosts posts={posts} />
      </div>
    </div>
  );
}