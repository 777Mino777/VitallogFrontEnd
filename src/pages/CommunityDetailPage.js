import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VlogNav from './VlogNav';

const CommunityDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postid } = useParams();
  
  let isCancelled = false;
  
  useEffect(() => {

    const fetchPost = async () => {
      if (!isCancelled) {
        try {
          const response = await fetch(`http://10.125.121.216:8080/api/vitallog/community/detail/${postid}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setPost(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();

    return () => {
      isCancelled = true;
    };
  }, [postid]);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment();
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-[1820px] mx-auto">
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
        <header className="p-6">
          <VlogNav isUserPage={true} />
        </header>
        <main className="font-omyu_pretty shadow-lg shadow-sky-400 rounded-2xl mx-36 mt-20 bg-custom-gradient border-4 border-sky-150 justify-center items-center text-center p-10">
          {post && (
            <div>
              <div className='flex justify-between'>
                <div className='font-bold rounded-lg mb-10 bg-white border-4 w-24'>조회수 : {post.visitcount}</div>
                <div className='w-28 pt-1 rounded-xl font-extrabold border-4 border-sky-200 bg-white mb-8' >작성자 : {post.writer}</div>
              </div>
              <h1 className="border-4 border-sky-200 bg-white rounded-xl text-4xl font-bold mb-12">{post.title}</h1>
              <div>
                <div className="flex text-start border-4 border-sky-200 bg-white rounded-xl text-lg"><pre>{post.contents}</pre></div>
                <p className="font-bold text-2xl text-right mt-12">{new Date(post.createDate).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </main>
        {/* 댓글 입력 */}
        <div className='font-omyu_pretty mt-6'>
          <form onSubmit={handleSubmit} className='flex'>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder='댓글을 입력하세요'
              className='ml-48 mt-4 text-xl placeholder-center rounded-lg border-4 border-custom-blue w-full'
            />
            <button type='submit' className='mr-48 mx-6 w-96 text-2xl mt-4 py-4 rounded-lg border-4 border-custom-blue bg-custom-blue text-white transition duration-300 hover:border-custom-blue hover:bg-white hover:text-custom-blue'>
              등록
            </button>
          </form>
        </div>
        {/* 댓글 목록 */}
        <div className='mt-4 mx-48'>
          {comments.map((comments, index) => (
            <div key={index} className='border-t border-sky-200 mt-2 pt-2'>
              {comments}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailPage
