import { useEffect, useState } from 'react';
import './PaginatedPostGrid.css';
import { PostGrid } from './PostGrid.jsx';

export function PaginatedPostGrid({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => paginate(i)}
        className={currentPage === i ? 'active' : ''}
      >
        {i}
      </button>
    )
  }

  return (
    <div className='paginated-post-grid'>
      <PostGrid posts={currentPosts} />
      
      <div className='pagination'>
        <button
          onClick={() => paginate(currentPage -1)}
          disabled={currentPage === 1}
        >
          上一页  
        </button>

        {pageButtons}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          下一页
        </button>
      </div>

    </div>
  );
}