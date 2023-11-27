import { useNavigate } from "react-router-dom";
import VlogNav from "./VlogNav"
import { useEffect, useState } from "react";

const CommunityPage = () => {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        const response = await fetch('api/vitallog/community/board');
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleCommunityWrite = () => {
    navigate("/community/write")
  }

  const handlePostClick = (postid) => {
    navigate(`/community/detail/${postid}`);
  }

  // let varWrites = 30;



  return (
    <div className="max-w-[1820px] mx-auto">
        <div className="flex flex-col min-h-screen bg-white text-gray-800">
            <header className="p-6">
                <VlogNav isUserPage={true}/>
            </header>
            <div className="flex mt-20 justify-end">
            <button onClick={handleCommunityWrite} className="font-extrabold text-3xl mb-10 mx-10 mr-44 px-24 py-3 w-100 rounded-xl border-4 border-custom-blue bg-custom-blue text-white transition-colors duration-300 hover:text-custom-blue hover:bg-white ">글쓰기
            </button>
            </div>
            <main className="flex-grow overflow-auto">
               <div className="grid grid-cols-4 gap-4 ml-32 mx-8">
                {posts.map((post,index) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post.id)}
                  className="shadow-xl shadow-sky-300 border-8 rounded-2xl bg-white w-80 px-20 py-36 border-custom-blue transition duration-300 hover:bg-sky-100"
                  >
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <p>{post.content}</p>                   
                </div>
))}
                {/* {Array.from({ length : varWrites }, (_, index) => (
                      <div key={index} className="shadow-xl shadow-sky-300 border-8 rounded-2xl bg-white w-80 px-20 py-36 border-custom-blue transition duration-300 hover:bg-sky-100">
                          <h3 className="text-lg font-semibold">글 제목 {varWrites - index}</h3>
                          <p>Post content placeholder</p>
                      </div>
                  )).reverse()} */}
                  </div>
            </main>
        </div>
        </div>
  )
}

export default CommunityPage
