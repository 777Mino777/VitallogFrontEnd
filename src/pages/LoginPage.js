import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import { LoginStateAtom } from "../components/user/LoginStateAtom";
import { useRecoilState } from "recoil";


const LoginPage = () => {
  
  const [isLoggedIn, setIsLoggedIn]  = useRecoilState(LoginStateAtom);

  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const backToMainPage = () => {
    navigate('/');
  }
  const GoToRegisterPage = () => {
    navigate('/register')
  }
  const handleLogin = async (e) => {
    console.log("1234")
    e.preventDefault();
    if (!id || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      setShowModal(true);
      return;
    }
  
    let url =`http://10.125.121.216:8080/login` ;
        e.preventDefault();
        axios
        .post(url, {id, password})
                .then(function (response) {
                  if(response.status === 200) {
                    localStorage.setItem('id', id);
                    localStorage.setItem('token', response.headers.get("Authorization"));
                    navigate('/user');
                  }
                      console.log("성공", response.status);
                      console.log(response.headers.get("Authorization"))
                      setIsLoggedIn(true)
                      // response
                  })
                  .catch(function (error) {
                      // 오류발생시 실행
                      setError('로그인 실패');
                      setShowModal(true);
                      console.log("실패", error);
                  })
                  .then(function () {
                      // 항상 실행
                      console.log("데이터 요청 완료");
                  });

  
  };
//


  return (
    <div className="flex min-h-screen bg-custom-gradient justify-center items-center">
      <div className="p-14 bg-white rounded-xl shadow-md relative py-24 sm:w-1/4 md:w-2/3 lg:w-1/2 xl:w-1/4 3xl:w-1/5">
        
        <div className="text-center">
        <h1 onClick={backToMainPage} className="text-5xl hover:cursor-pointer hover:scale-x-110 transition-all hover:text-custom-blue font-bold mb-12">Vital Log</h1>
        <h2 className="text-2xl mb-9 font-bold">Login</h2>
          {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <InputField 
            id="id"
            label="ID"
            type="text"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <InputField
            id="password"
            label="PASSWORD"
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center mb-2 mt-8">
            <button
              className="bg-custom-blue hover:bg-sky-400 text-white font-bold py-2 px-9 rounded-xl focus:outline-none focus:shadow-outline w-full"
              type="submit"          
            >
              Sign in
            </button>
            </div>
            <div>
            </div>
            <div className="text-center">
            <button onClick={GoToRegisterPage}
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    type="button"
                    >
              회원가입
            </button>
            </div>
        </form>
      </div>
    </div>
    {showModal &&
      <Modal title="로그인 오류" onClose={() => setShowModal(false)}>
        <p>{error}</p>
      </Modal>
      }
    </div>
  );
};

export default LoginPage;
