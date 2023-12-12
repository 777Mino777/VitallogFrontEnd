import { useNavigate } from "react-router-dom";
import VlogNav from "./VlogNav"
import { useEffect, useState } from "react";
import dailyImage from '../images/daily.png'
import proudImage from '../images/proud.png'
import questionImage from '../images/question.jpg'
import recruitImage from '../images/recruit.jpg'
import tipImage from '../images/tip.jpg'
const CommunityPage = () => {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const Authorization = localStorage.getItem('token');

  const categoryImages = {
    daily: dailyImage,
    proud: proudImage,
    question: questionImage,
    recruit: recruitImage,
    tip: tipImage,
  }

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

  const handlePostClick = (postid, postcategory) => {
    console.log("asdsaasdasdasdasds",postcategory)
    navigate(`/community/detail/${postid}/${postcategory}`);
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
    <div className="page-hi max-w-[1820px] mx-auto">
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
        <header className="p-6">
          <VlogNav isUserPage={true} />
        </header>
        <div className="flex w-full mt-10 justify-between">
          <div className="">
            <div className="flex justify-end w-full">
              <button onClick={handleCommunityWrite} className="font-extrabold text-xl mb-5 py-2 px-8 rounded-xl border-2 border-custom-blue bg-white text-custom-blue transition duration-700 hover:text-white hover:bg-custom-gradient hover:border-sky-100 ">
                글쓰기
              </button>
            </div>
            <form className="pl-60">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="text-center px-2 ml-12 rounded-lg py-3 text-base border-2 border-[#d9d9d9]"
              >
                <option value="all">전체</option>
                <option value="title">제목</option>
                <option value="writer">작성자</option>
              </select>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어 입력"
                className="text-base w-[59rem] ml-3 px-4 placeholder:text-center border-2 border-[#D9D9D9] py-3 rounded-lg"
              />
              <button

                onClick={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="font-bold text-base rounded-lg ml-3 px-16 py-3 border-2 border-[#c2c0c0] bg-[#c2c0c0] text-white transition duration-200 hover:border-gray-400 hover:bg-gray-400"
              >
                검색
              </button>
            </form>
          </div>

        </div>
        <main className=" flex-grow overflow-auto mt-10">
          <div className="grid grid-cols-4 gap-4 px-72">
            {filteredPosts.map((post) => (
              <button
                key={post.id}
                onClick={() => handlePostClick(post.id, post.category)}
                className={`overflow-hidden shadow-lg shadow-gray-400 border-1 rounded-xl bg-white mb-4 w-72 border-gray-300 transition duration-300 hover:scale-95 flex flex-col justify-between}`}
              >
                <div key={post.id} className="h-32 w-full">
                  <img className="w-full h-full object-cover" src={categoryImages[post.category]} alt={`${post.category}`} />
                </div>

                <div className="w-full h-2 mt-5 mx-2  flex justify-stretch">
                  <h3 className={`w-[3rem] text-lg font-bold self-center ${categoryColors[post.category]}`}>{categoryNames[post.category]}</h3>
                  <h3 className="w-[13rem] text-lg font-extrabold self-center text-start truncate">&nbsp;{post.title}</h3>
                </div>
                <div className="h-20 mb-10 ">
                  <p className="w-60 inline-block text-md ml-4 mt-5 mb-10 text-gray-400 truncate text-start">{post.contents}</p>
                </div>
                <div className="flex justify-around pl-[0.9rem] pr-2 py-5">
                  <div className="flex items-end pr-24">
                    <span className="font-omyu_pretty text-xs pr-3" >&nbsp;{post.createDate}</span>
                    <span className="font-omyu_pretty text-xs pr-4 ">👁&nbsp;{post.visitcount}</span>
                  </div>
                  <div className="flex">
                    <span className="rounded-lg border-black font-bold text-xs">📝{post.writer}</span>
                  </div>
                </div>
              </button>
            ))}
            {/*  */}
          </div>
        </main>
      </div>
    </div>
  )
}

export default CommunityPage;
