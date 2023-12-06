import { useEffect, useState } from "react";
import SideBar from "../../components/mypage/SideBar";
import VlogNav from "../VlogNav";
import LogChart from "../../components/mypage/LogChart";
import LogTable from "../../components/mypage/LogTable";


const TotalPage = () => {
  const [userlog, setUserlog] = useState();
  const [dailyTotalLog, setDailyTotalLog] = useState();

 

  useEffect(() => {
    const url = `http://10.125.121.216:8080/api/vitallog/mypage/${localStorage.getItem("id")}/total`
    const token = localStorage.getItem("token")

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": token,
      }
    }).then(resp => resp.json())
      .then(data => {
        setUserlog(data.userlog);
        setDailyTotalLog(data.dailyTotalLog);
      })
  }, []);

    
    

  return (
    <div className="max-w-[1820px] mx-auto h-screen flex flex-col">
      <header className="p-2 sm:p-6">
        <VlogNav isUserPage={true} />
      </header>
      <div className="grow  overflow-hidden	flex py-8 mb-4 px-20 mx-20 bg-white text-gray-800">
        <SideBar page={"total"} />
        <main className="mx-10 p-10 border-2 w-full  rounded-lg shadow">
          <div className="h-full overflow-auto">
            <div className="text-2xl font-bold">전체 로그보기</div>
            <div className="flex justify-center  items-center">
              <div className="w-[1020px]">
                <LogChart caption="Total Log" logData={dailyTotalLog}/>
              </div>
            </div>
            <div className="px-10 py-20">
              <LogTable userlog={userlog}/>
            </div>
            

          </div>
        </main>
      </div>
    </div>
  );
};

export default TotalPage;
