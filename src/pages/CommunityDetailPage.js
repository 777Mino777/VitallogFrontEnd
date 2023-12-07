import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VlogNav from './VlogNav';
import CommentWrite from '../components/CommentWrite';
import CommentList from '../components/CommentList';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  let isCancelled = false;

  useEffect(() => {

    const fetchPost = async () => {
      if (!isCancelled) {
        try {
          const response = await fetch(`http://10.125.121.216:8080/api/vitallog/community/detail/${postid}`, {
            headers: {
              "Authorization": Authorization
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
        const response = await fetch(`http://10.125.121.216:8080/api/vitallog/community/${postid}/comments`, {
          headers: {
            "Authorization": Authorization,
          }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setComments(data);
        console.log("comments", data)
      } catch (error) {
        setError(error.message);
      }
    };

    fetchComments();
  }, [postid]);

  const addComment = async (commentContent) => {
    try {
      const response = await fetch(`http://10.125.121.216:8080/api/vitallog/community/${postid}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Authorization,
        },
        body: JSON.stringify({
          "writer": userid,
          "contents": commentContent,
          "createDate": createDate,
        }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const newCommentData = await response.json();
      console.log("resp", newCommentData)
      setComments(newCommentData);
    } catch (error) {
      setError(error.message);
    }

  };

  const deleteComment = async (replyid) => {
    try {
      const response = await fetch(`http://10.125.121.216:8080/api/vitallog/community/${postid}/comments/${replyid}`, {
        method: 'DELETE',
        headers: {
          'Authorization': Authorization,
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');

      setComments(comments.filter(comment => comment.id !== replyid));
    }
    catch (error) {
      setError(error.message);
    }
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`http://10.125.121.216:8080/api/vitallog/community/board/${postid}`, {
        method: 'DELETE',
        headers: {
          'Authorization': Authorization,
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');

      navigate("/community")
      alert("게시물이 삭제되었습니다.")
    } catch (error) {
      setError(error.message);
    }
  };

  const editComment = async (commentId, updatedContent) => {
    try {
      const response = await fetch(`http://10.125.121.216:8080/api/vitallog/community/${userid}/comments/${commentId}?contents=${encodeURIComponent(updatedContent)}`, {
        method : 'PUT',
        headers : {
          'Authorization' : Authorization,
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');

      setComments(comments.map(comment =>
        comment.id === commentId ? { ...comment, contents : updatedContent } : comment));
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
        <main className="font-omyu_pretty rounded-2xl mx-80 mt-20 bg-white border-4 border-sky-150 justify-center items-center text-center">
          {post && (
            <div>
              <h1 className="border-b-4 w-[100%] text-white border-custom-blue bg-custom-blue py-2 rounded-t-lg text-3xl font-bold">{post.title}</h1>
              <div className='flex justify-between border-b-4'>
                <div className='flex items-center justify-center w-24 rounded-xl font-extrabold bg-white' >작성자 : {post.writer}</div>
                <div className='flex text-gray-700 items-center justify-center font-bold text-2xl mb-10 w-24'>조회수 : {post.visitcount}</div>
              </div>
              <div className=''>
                <div className="overflow-auto break-all	 flex h-[20rem] p-2 text-start border-4 border-white bg-white rounded-xl text-lg">{post.contents}</div>
                <p className="font-bold text-2xl text-right mt-12">{new Date(post.createDate).toLocaleDateString()}</p>
              </div>
              {post.writer === userid && (
                <button onClick={() => navigate(`/community/edit/${postid}`, { state: { post } })}
                  className="border-green-500 bg-white border-4 text-green-700 mx-2 p-2 rounded transition duration-300 hover:bg-white hover:border-green-500 hover:text-green-500" >게시물 수정</button>
              )}
              {post.writer === userid && (
                <button onClick={deletePost} className="border-red-500 bg-white border-4 text-red-700 p-2 rounded transition duration-300 hover:bg-white hover:border-red-500 hover:text-red-500">게시물 삭제</button>
              )}
            </div>
          )}
        </main>
        {/* 댓글 입력 */}
        <CommentWrite postid={postid} onCommentSubmit={addComment} />
        {/* 댓글 목록 */}
        <CommentList
          comments={comments}
          onDeleteComment={deleteComment}
          onEditComment={editComment}
          userId={userid}
        />
      </div>
    </div>
  );
};

export default CommunityDetailPage
