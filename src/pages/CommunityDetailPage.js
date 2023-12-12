import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VlogNav from './VlogNav';
import CommentWrite from '../components/CommentWrite';
import CommentList from '../components/CommentList';
import { useNavigate } from 'react-router-dom';
import { IoCaretBackOutline } from "react-icons/io5";

const CommunityDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const postid = useParams().postid;
  const postCategory = useParams().category;
  const [comments, setComments] = useState([]);
  // const [newComment, setNewComment] = useState('');

  const createDate = new Date().toISOString();
  const Authorization = localStorage.getItem('token')
  const userid = localStorage.getItem('id');

  const categoryNames = {
    daily: "일상",
    proud: "자랑",
    question: "질문",
    recruit: "모집",
    tip: "꿀팁",
  }

  const categoryColors = {
    daily: "text-cyan-500",
    proud: "text-sky-700",
    question: "text-red-300",
    recruit: "text-teal-500",
    tip: "text-amber-400",
  }

  const handleBackToCommunity = (e) => {
    e.preventDefault();
    navigate("/community")
  }

  const navigate = useNavigate();

  let isCancelled = false;

  // useEffect(() => {
  //   console.log("이히힝", postid, postCategory)
  // }, [])

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
        method: 'PUT',
        headers: {
          'Authorization': Authorization,
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');

      setComments(comments.map(comment =>
        comment.id === commentId ? { ...comment, contents: updatedContent } : comment));
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
        <main className="shadow-lg rounded-2xl mx-80 mt-20 bg-white border-2 border-gray-200 justify-center items-center text-center">
          {post && (
            <div>

              <div className="px-4 items-center flex border-b-4 w-[100%] border-custom-blue bg-custom-blue py-2 rounded-t-lg ">
                <div onClick={handleBackToCommunity} className="cursor-pointer mr-4 text-white text-2xl"><IoCaretBackOutline /></div>
                <div className="w-full text-xl font-bold text-white">{post.title}</div>
              </div>
              <div className='px-10'>
                <div className='flex justify-between border-b-2'>
                  <div className="flex">
                    <div className={`font-bold font-omyu_pretty mt-5 text-xl mr-2 ${categoryColors[postCategory]}`}>{categoryNames[postCategory]}</div>
                    <div className='font-omyu_pretty flex w-[7rem] mt-5 mb-3 text-xl rounded-xl font-extrabold bg-white' >작성자 : {post.writer}</div>
                  </div>
                  <div className='font-omyu_pretty flex text-gray-700 font-bold text-xl mt-5 mb-3 mr-2'>조회수 : {post.visitcount}</div>
                </div>
                <div className=''>
                  <div className="overflow-auto break-all	mt-5 flex h-[20rem] p-2 text-start border-4 border-white bg-white rounded-xl text-md"><pre>{post.contents}</pre></div>
                  <p className="font-omyu_pretty text-gray-400 text-xl text-right mt-2 mb-4">{new Date(post.createDate).toLocaleDateString()}</p>
                </div>
                <div className='flex justify-end mb-12'>
                  {post.writer === userid && (
                    <button onClick={() => navigate(`/community/edit/${postid}/${postCategory}`, { state: { post } })}
                      className="font-omyu_pretty border-gray-400 bg-white border-2 py-1 text-gray-400 text-xl mr-8 px-8  rounded-xl transition duration-300 hover:border-black hover:text-black" >수 정</button>
                  )}
                  {post.writer === userid && (
                    <button onClick={deletePost} className="font-omyu_pretty border-gray-400 bg-white text-xl border-2 text-gray-400 px-8 py-1 rounded-xl transition duration-300 hover:border-black hover:text-black">삭 제</button>
                  )}
                </div>
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
          onEditComment={editComment}
          userId={userid}
        />
      </div>
    </div>
  );
};

export default CommunityDetailPage
