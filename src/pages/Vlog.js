import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./LoginPage"
import MainPage from "./MainPage"
import RegisterPage from "./RegisterPage"
import UserPage from "./UserPage"
import CommunityPage from "./CommunityPage"
import InformationPage from "./InformationPage"
import MyPage from "./MyPage"
import CommunityWritePage from "./CommunityWritePage"
import CommunityDetailPage from "./CommunityDetailPage"
const Vlog = () => {

  const isLoggedIn = () => {
    return localStorage.getItem('token') != null;
  };

  return (
    <Router>
      <div>
        {/* { isLoggedIn() ? ( */}
          <Routes>
            로그인 상태에서 보여줄 페이지
            <Route path="/user" element={<UserPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/write" element={<CommunityWritePage />}/>
            <Route path="/community/detail" element={<CommunityDetailPage />} />
            <Route path="/information" element={<InformationPage />} />
          {/* </Routes> */}
        {/* ) : ( */}
         {/* <Routes> */}
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/information" element={<InformationPage />} />
          </Routes>
        {/* ) } */}
      </div>
    </Router>
         );
};

export default Vlog
