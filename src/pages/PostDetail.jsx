import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { Header } from '../components/Header';
import { PostGrid } from '../components/PostGrid';
import './PostDetail.css';
import { MailReply } from '../components/MailReply';

export function PostDetail({ links, posts }) {
  const { slug } = useParams();
  const currentPost = posts.filter(p => p.slug === slug)[0];

  const recommendedPosts = posts.slice(0, 3);

  return (
    <>
      <Header links={links} />
      <div className='post-detail-wrapper'>
        <div className='post-content'>
          <ReactMarkdown>{currentPost.content}</ReactMarkdown>
          <MailReply postTitle={currentPost.title} />
        </div>
        <div className='post-grid-container'>
          <PostGrid posts={recommendedPosts} layout='compact' />
        </div>
      </div>


    </>
  );
}
