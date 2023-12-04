import { useRef, useState } from "react";
import SideBar from "../../components/mypage/SideBar";
import VlogNav from "../VlogNav";
import LogChart from "../../components/mypage/LogChart";
import LogTable from "../../components/mypage/LogTable";

const PeriodPage = () => {
  const [userlog, setUserlog] = useState();
  const [dailyTotalLog, setDailyTotalLog] = useState();

  const fromDate = useRef();
  const toDate = useRef();

  const getPeriodLog = () => {
    if (fromDate.current.value === '' || toDate.current.value === '') return;
    if (fromDate.current.value > toDate.current.value) {
      let tempDate = fromDate.current.value;
      fromDate.current.value = toDate.current.value;
      toDate.current.value = tempDate;
    }

    const userid = localStorage.getItem("id");
    const url = `http://10.125.121.216:8080/api/vitallog/mypage/${userid}/periods`
      + `?from=${fromDate.current.value}&to=${toDate.current.value}`
    const token = localStorage.getItem("token")

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": token,
      }
    }).then(resp => resp.json())
      .then(data => {
        console.log(data)
        setUserlog(data.userlog);
        setDailyTotalLog(data.dailyTotalLog);
      });




  }

  return (
    <div className="max-w-[1820px] mx-auto h-screen flex flex-col">
      <header className="p-2 sm:p-6">
        <VlogNav isUserPage={true} />
      </header>
      <div className="grow overflow-hidden flex py-8 mb-4 px-20  bg-white text-gray-800">
        <SideBar page={"period"} />
        <main className="mx-10 p-10 border-2	w-full rounded-lg shadow">
          <div className="h-full overflow-auto">
            <div className="text-2xl font-bold">기간별 로그보기</div>
            <div className="mt-5">
              <input type="date" ref={fromDate} className="border rounded-full p-1 px-3" />
              <span className="mx-2 font-bold">~</span>
              <input type="date" ref={toDate} className="border rounded-full p-1 px-3" />
              <button className="border-2 border-custom-blue ml-4 p-1 px-4 rounded-full font-bold" onClick={getPeriodLog} >보기</button>
            </div>
            <div className="flex justify-center  items-center">
              <div className="w-[1200px]">
                <LogChart caption="Total Log" logData={dailyTotalLog}/>
              </div>
            </div>
            <div className="p-20">
              {userlog && <LogTable userlog={userlog}/>}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default PeriodPage;
