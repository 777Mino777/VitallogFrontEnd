import { useNavigate } from "react-router-dom";
import VlogNav from "./VlogNav"
import { useEffect, useState } from "react";

const CommunityPage = () => {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://10.125.121.216:8080/api/vitallog/community/board');
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



    return (
      <div className="max-w-[1820px] mx-auto">
        <div className="flex flex-col min-h-screen bg-white text-gray-800">
          <header className="p-6">
            <VlogNav isUserPage={true} />
          </header>
          <div className="font-omyu_pretty flex ml-44 mt-20 justify-between">
            <div>
              <form>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="text-center w-48 mr-2 rounded-lg py-4 text-2xl border-8 border-custom-blue"
              >
                <option value="all">제목+작성자</option>
                <option value="title">제목</option>
                <option value="wrtier">작성자</option>
              </select>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어 입력"
                className="text-2xl placeholder-center ml-2 px-48 border-8 border-custom-blue py-3 rounded-lg"
              />
              <button

                onClick={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="font-bold text-2xl rounded-lg py-3 px-24 ml-4 border-8 border-custom-blue bg-custom-blue text-white transition duration-200 hover:border-sky-400 hover:bg-sky-400"
              >
                검색
              </button>
            </form>
            </div>
            <button onClick={handleCommunityWrite} className="font-extrabold text-3xl mb-10 mr-40 py-3 w-60 rounded-xl border-8 border-custom-blue bg-white text-custom-blue transition duration-700 hover:text-white hover:bg-custom-gradient hover:border-sky-100 ">
              글쓰기
            </button>
          </div>
          <main className="font-omyu_pretty flex-grow overflow-auto">
            <div className="grid grid-cols-4 gap-4 ml-36 mx-12">
              {filteredPosts.map((post, index) => (
                <button
                  key={post.id}
                  onClick={() => handlePostClick(post.id)}
                  className="shadow-xl shadow-sky-300 border-8 rounded-2xl bg-white mb-4 w-80 px-2 py-12 border-custom-blue transition duration-300 hover:border-sky-800 hover:bg-custom-gradient flex flex-col justify-between"
                >
                  <h3 className="text-3xl font-bold self-center mt-0">{post.title}</h3>
                  <div className="flex justify-around items-end w-full mt-36">
                    <span className="text-lg pr-12">{post.writer}</span>
                    <span className="text-lg ">👁 {post.visitcount}</span>
                  </div>
                </button>
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

  export default CommunityPage;
