import { useNavigate } from "react-router-dom";
import VlogNav from "./VlogNav"
import { useEffect, useState } from "react";

const CommunityPage = () => {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const Authorization = localStorage.getItem('token');

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://10.125.121.216:8080/api/vitallog/community/board', {
          headers: {
            "Authorization": Authorization
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json();
        console.log(data);
        setPosts([...data].reverse());
        setFilteredPosts([...data].reverse());
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

  const handleSearch = () => {

    let result = [];
    if (searchType === "title") {
      result = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    } else if (searchType === "writer") {
      result = posts.filter(post =>
        post.writer.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      result = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
        || post.writer.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredPosts(result);
  };
  // let varWrites = 1;

  const handleDelete = async (postid) => {
    try {
      const response = await fetch(`http://10.125.121.216:8080/api/vitallog/community/board/${postid}`, {
        method: 'DELETE',
        headers: {
          "Authorization": Authorization,
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setFilteredPosts(filteredPosts.filter(post => post.id !== postid));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="max-w-[1820px] mx-auto">
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
        <header className="p-6">
          <VlogNav isUserPage={true} />
        </header>
        <div className="font-omyu_pretty flex w-full mt-20 justify-between">
          <div className="w-[75%]">
            <form className="pl-48">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="text-center px-4 mr-2 rounded-lg py-4 text-2xl border-8 border-custom-blue"
              >
                <option value="all">제목+작성자</option>
                <option value="title">제목</option>
                <option value="writer">작성자</option>
              </select>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어 입력"
                className="text-2xl w-[50rem] px-2 placeholder:text-center border-8 border-custom-blue py-3 rounded-lg"
              />
              <button

                onClick={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="font-bold text-2xl rounded-lg ml-2 px-16 py-3 border-8 border-custom-blue bg-custom-blue text-white transition duration-200 hover:border-sky-400 hover:bg-sky-400"
              >
                검색
              </button>
            </form>
          </div>
          <button onClick={handleCommunityWrite} className="font-extrabold text-3xl mb-10 mr-40 py-3 px-16 rounded-xl border-8 border-custom-blue bg-white text-custom-blue transition duration-700 hover:text-white hover:bg-custom-gradient hover:border-sky-100 ">
            글쓰기
          </button>
        </div>
        <main className="font-omyu_pretty flex-grow overflow-auto">
          <div className="grid grid-cols-4 gap-4 ml-36 mx-12">
            {filteredPosts.map((post, index) => (
              <button
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="shadow-xl shadow-sky-300 border-8 rounded-2xl bg-white mb-4 w-80 border-custom-blue transition duration-300 hover:border-sky-800 hover:bg-custom-gradient flex flex-col justify-between"
              >
                <span className="px-1 rounded-lg border-e-4 border-b-4 border-black font-bold text-lg">📝{post.writer}</span>
                <h3 className="text-3xl mt-10 font-bold self-center truncate w-52">{post.title}</h3>
                <div className="flex justify-around items-end w-full mt-52">
                  <div className="text-lg font-bold pr-32" >⌚&nbsp;{post.createDate}</div>
                  <span className="font-bold text-lg ">👁&nbsp;{post.visitcount}</span>
                </div>
              </button>
            ))}

            {/* {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="shadow-xl shadow-sky-300 border-8 rounded-2xl bg-white mb-4 w-80 border-custom-blue transition duration-300 hover:border-sky-800 hover:bg-custom-gradient flex flex-col justify-between"
              >
                <div className="flex justify-around items-end w-full mt-52">
                  <span className="px-1 rounded-lg border-e-4 border-b-4 border-black font-bold text-lg">📝{post.writer}</span>
                  {post.isOwnPost && (
                    <button onClick={() => handleDelete(post.id)} className="text-red-500">X</button>
                  )}
                  <h3 className="text-3xl mt-10 font-bold self-center truncate w-52">{post.title}</h3>
                  <div className="text-lg font-bold pr-32" >⌚&nbsp;{post.createDate}</div>
                  <span className="font-bold text-lg ">👁&nbsp;{post.visitcount}</span>
                </div>
              </div>
            ))} */}

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

export default CommunityPage;
