import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VlogNav from './VlogNav';
import CommentWrite from '../components/CommentWrite';
import CommentList from '../components/CommentList';

const CommunityDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postid } = useParams();
  
  const [comments, setComments] = useState([]);
  // const [newComment, setNewComment] = useState('');

  const createDate = new Date().toISOString();
  const Authorization = localStorage.getItem('token')
  const userid = localStorage.getItem('id');

  let isCancelled = false;
  
  useEffect(() => {

    const fetchPost = async () => {
      if (!isCancelled) {
        try {
          const response = await fetch(`http://10.125.121.216:8080/api/vitallog/community/detail/${postid}`, {
            headers : {
              "Authorization" : Authorization
            }
          });
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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://10.125.121.216:8080/api/vitallog/community/${postid}/comments`,{
          headers : {
            "Authorization" : Authorization,
          }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setComments(data);
        console.log("comments",data)
      } catch (error) {
        setError(error.message);
      }
    };

    fetchComments();
  }, [postid]);

  const addComment = async (commentContent) => {
    try {
      const response = await fetch(`http://10.125.121.216:8080/api/vitallog/community/${postid}/comments`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : Authorization,
        },
        body : JSON.stringify({ 
          "writer" : userid,
          "contents" : commentContent,
          "createDate" : createDate, 
        }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const newCommentData = await response.json();
      console.log("resp",newCommentData)
      setComments(newCommentData);
    } catch (error) {
      setError(error.message);
    }

  };

  const deleteComment = async (replyid) => {
    try { 
      const response = await fetch(`http://10.125.121.216:8080/api/vitallog/community/${postid}/comments/${replyid}`, {
        method : 'DELETE',
        headers : {
          'Authorization' : Authorization,
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');

      setComments(comments.filter(comment => comment.id !== replyid));
    } catch (error) {
      setError(error.message);
    }
  };

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
                <div className='flex text-gray-700 items-center justify-center font-bold text-2xl mb-10 w-20'>👁 {post.visitcount}</div>
                <div className='flex items-center justify-center w-36 pt-1 rounded-xl font-extrabold border-4 border-sky-200 bg-white mb-9' >📝 {post.writer}</div>
              </div>
              <h1 className="border-4 border-sky-200 bg-white rounded-xl text-4xl font-bold mb-12">{post.title}</h1>
              <div>
                <div className="flex h-[20rem] p-2 text-start border-4 border-sky-200 bg-white rounded-xl text-lg"><pre className='font-omyu_pretty' >{post.contents}</pre></div>
                <p className="font-bold text-2xl text-right mt-12">{new Date(post.createDate).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </main>
        {/* 댓글 입력 */}
        <CommentWrite postid={postid} onCommentSubmit={addComment} />
        {/* 댓글 목록 */}
        <CommentList 
          comments={comments}
          onDeleteComment={deleteComment}
          userId={userid}
        />
      </div>
    </div>
  );
};

export default CommunityDetailPage
