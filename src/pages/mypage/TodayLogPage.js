import { useEffect, useRef, useState } from "react";
import SideBar from "../../components/mypage/SideBar";
import VlogNav from "../VlogNav";
import SearchableSelect from "../../components/mypage/SearchableSelect";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const TodayLogPage = () => {
  const navigate = useNavigate();

  const [exerid, setExerid] = useState();
  const [met, setMet] = useState();

  const [kcal, setKcal] = useState(0);

  const timeRef = useRef();
  const weightRef = useRef();

  const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + (date.getDate())).slice(-2);
    return `${year}-${month}-${day}`;
  }


  const calcEnergy = () => {
    if (timeRef.current.value === '' || weightRef.current.value === '' || met === undefined) {
      alert("모든 항목을 입력하세요");
      return
    }

    setKcal((met * weightRef.current.value * (timeRef.current.value / 60)).toFixed(2))
  }

  const addDailyLog = () => {
    if ((timeRef.current.value === '' || weightRef.current.value === '' || met === undefined)
      || (kcal < 0)) {
      alert("입력이 올바르지 않습니다.");
      return
    }

    const url = `http://10.125.121.216:8080/api/vitallog/mypage/${localStorage.getItem("id")}/logs`
    const data = {
      "exerDate": getDate(),
      "exerTime": timeRef.current.value,
      "kcal": kcal,
      "exerid": exerid
    }
    axios
      .post(url,data, {headers:{
        Authorization : localStorage.getItem("token")
      }})
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (error) {

      })
      .then(function () {
        // 항상 실행
        console.log("데이터 요청 완료");
      });
  }


  return (
    <div className="max-w-[1820px] mx-auto h-screen flex flex-col">
      <header className="p-2 sm:p-6">
        <VlogNav isUserPage={true} />
      </header>
      <div className="grow flex py-8 mb-4 px-20 bg-white text-gray-800">
        <SideBar page={"today"} />
        <main className="mx-10 p-10 border-2	w-full rounded-lg shadow">
          <div className="h-full">
            <div className="text-2xl font-bold">오늘의 로그 기록하기</div>
            <div className="h-full py-10 text-center">
              <div className="grid grid-cols-2 h-full gap-1 p-10 px-20 border border-[#000] rounded-lg">
                <div className="p-5  flex flex-col justify-center ">
                  <div className="flex justify-start text-lg font-bold mb-3">날짜</div>
                  <input className="border border-[#000] h-10 rounded-full text-center w-full" value={getDate()} readOnly />
                </div>
                <SearchableSelect setMet={setMet} setExerid={setExerid} />
                <div className="p-5  flex flex-col justify-center ">
                  <div className="flex justify-start items-end text-lg font-bold mb-3">운동시간<span className="text-sm font-medium ml-2">(분)</span></div>
                  <input ref={timeRef} placeholder="운동시간을 입력해주세요."
                    className="border border-[#000] h-10 rounded-full text-center w-full" />
                </div>
                <div className="p-5  flex flex-col justify-center ">
                  <div className="flex justify-start text-lg items-end font-bold mb-3">몸무게 <span className="text-sm font-medium ml-2">(kg)</span></div>
                  <input ref={weightRef} placeholder="몸무게를 입력해주세요."
                    className="border border-[#000] h-10 rounded-full text-center w-full" />
                </div>
                <div className="col-span-2">
                  <button className="bg-[#EBEBEB] p-2 px-5 rounded-full font-bold" onClick={() => calcEnergy()}>에너지소비량 계산하기</button>

                </div>
                <div className="col-span-2">
                  <div className="flex justify-center text-lg font-bold mb-3">소모칼로리</div>
                  <div className="font-semibold"><span className="text-2xl text-[#D3545C]">{kcal}</span> kcal</div>
                </div>
                <div className="col-span-2">
                  <button className="w-full bg-custom-blue h-10 rounded-full font-bold text-white" onClick={() => addDailyLog()}>
                    데일리로그 추가하기
                  </button>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TodayLogPage;
