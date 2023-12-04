import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./LoginPage"
import MainPage from "./MainPage"
import RegisterPage from "./RegisterPage"
import UserPage from "./UserPage"
import CommunityPage from "./CommunityPage"
import InformationPage from "./InformationPage"
import MyPage from "./mypage/MyPage";
import TotalPage from "./mypage/TotalPage";
import TodayLogPage from "./mypage/TodayLogPage";
import PeriodPage from "./mypage/PeriodPage";
import CommunityWritePage from "./CommunityWritePage"
import CommunityDetailPage from "./CommunityDetailPage"
const Vlog = () => {

  // const isLoggedIn = () => {
  //   return localStorage.getItem('token') != null;
  // };

  return (
    <Router>
      <div>
        {/* { isLoggedIn() ? ( */}
        <Routes>
          {/* 로그인 상태에서 보여줄 페이지 */}
          <Route path="/user" element={<UserPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/write" element={<CommunityWritePage />} />
          <Route path="/community/detail/:postid" element={<CommunityDetailPage />} />
          <Route path="/information" element={<InformationPage />} />
          {/* </Routes> */}
          {/* ) : ( */}
          {/* <Routes> */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/total" element={<TotalPage />} />
          <Route path="/today" element={<TodayLogPage />} />
          <Route path="/period" element={<PeriodPage />} />
        </Routes>
        {/* ) } */}
      </div>
    </Router>
  );
};

export default Vlog
