import { useEffect, useState } from "react";
import SideBar from "../../components/mypage/SideBar";
import VlogNav from "../VlogNav";
import LogCardList from "../../components/mypage/LogCardList";

const MyPage = () => {
  const [userlog, setUserlog] = useState();
  
  useEffect(()=>{
    const userid = localStorage.getItem("id");
    const url = `http://10.125.121.216:8080/api/vitallog/mypage/${userid}/today?date=${getDate()}`
    const token = localStorage.getItem("token")
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": token,
      }
    }).then(resp => resp.json())
      .then(data => {
        setUserlog(data);
      });

  },[]);


  const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + (date.getDate())).slice(-2);
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="max-w-[1820px] mx-auto h-screen overflow-hidden flex flex-col">
      <header className="p-2 sm:p-6">
        <VlogNav isUserPage={true} />
      </header>
      <div className="grow flex py-8 mb-4 px-20 bg-white text-gray-800">
        <SideBar page={"mypage"} />
        <main className="mx-10 p-10 border-2	w-full rounded-lg shadow">
          <div className="h-full">
            <div className="text-2xl font-bold">오늘의 로그보기</div>
            <div className="h-full flex justify-center items-center">
              { userlog &&  <LogCardList data={userlog} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyPage;
