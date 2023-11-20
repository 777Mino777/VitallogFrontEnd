import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./LoginPage"
import MainPage from "./MainPage"
import RegisterPage from "./RegisterPage"
import UserPage from "./UserPage"
import CommunityPage from "./CommunityPage"
import InformationPage from "./InformationPage"
import MyPage from "./MyPage"
const Vlog = () => {

  const isLoggedIn = () => {
    return localStorage.getItem('token') != null;
  };

  return (
    <Router>
      <div>
        {isLoggedIn() ? (
          <Routes>
            {/* 로그인 상태에서 보여줄 페이지 */}
            <Route path="/user" element={<UserPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/information" element={<InformationPage />} />
          </Routes>
        ) : (
          // 로그아웃 상태에서 보여줄 페이지
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/information" element={<InformationPage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default Vlog
