import { useNavigate, useParams } from "react-router-dom";
import VlogNav from "./VlogNav";
import RunningMan from "../components/RunningMan";
import { useEffect, useState } from "react";
const UserPage = () => {

  const navigate = useNavigate();
  const userid = localStorage.getItem("id");
  const [username, setUsername] = useState('');
  const [exerciseRecords, setExerciseRecords] = useState([]);

  useEffect(() => {
    const Authorization = localStorage.getItem("token")

    // if (userid) {
    fetch(`http://10.125.121.216:8080/api/vitallog/user/${userid}`, { // 누구에게
      method: "GET", //get post delete put ...
      headers: {
        "Content-Type": 'application/json', // 이것은 json
        "Authorization": Authorization,  // 나는 유저다
      },
      // body : JSON.stringify({ // json 바꾸기 // 내가 보낼거
      //   "키" : "값" // 물건
      // }) 
    })
      .then(resp => resp.json())
      .then((data) => {
        console.log(data);
        setUsername(data.user[0].name);
        setExerciseRecords(data.log);
      })
      .catch(err => console.log(err));
    // } else {
    //   console.log('User Id is undefined')
    // }

  }, [])



  const GoToMyPage = () => {
    navigate("/mypage")
  }

  const filledExerciseRecords = new Array(3).fill({}).map((_, index) => {
    return exerciseRecords[index] || { exerDate: '', exercise: '', exerTime: '', kcal: '' };
  });

  return (
    <div className="max-w-[1820px] mx-auto">
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
        <header className="p-2 sm:p-6">
          <VlogNav isUserPage={true} />
        </header>
        <main className="flex my-0.5 py-14">
          <div className="mx-10 bg-custom-gradient border-4 mb-1 border-black bg-white rounded-xl shadow-md relative sm:w-1/4 md:w-2/3 lg:w-1/2 xl:w-2/3 3xl:w-1/5">
            <div className="flex">
              <button className=" bg-white m-24 p-1 border-4  border-black rounded-[50%] w-53 h-48">
                <RunningMan />
              </button>
              <div className=" mx-0 text-5xl my-40 font-bold text-white">
                {username}님
                <br />
                어서오세요
              </div>
            </div>
            <div className="p-0.5 mx-28 font-bold text-3xl">Log
            </div>

            <div id="exercisedata" className="flex-col space-y-12 py-12 px-12">
              {filledExerciseRecords.map((record, index) => (
                <div key={index} className="flex items-center space-x-16 bg-white sm:text-xl hover:bg-sky-100 text-black border-4 border-black font-bold py-2 px-8 sm:px-10 rounded-xl">
                  {/* 이 밑의 div 4개 */}
                  <div className="mx-2 flex">{record.exerDate ? `${record.exerDate}` : '🏃‍♂️\u00A0'}</div>
                  <div className="flex-1">{record.exercise ? `${record.exercise}` : '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 운동기록을 채워봐요! \u00A0\u00A0\u00A0\u00A0'}</div>
                  <div className="flex">{record.exerTime ? `${record.exerTime}분` : ' '}</div>
                  <div className="flex">{record.kcal ? `${record.kcal}kcal` : '\u00A0🏃‍♀️'}</div>
                </div>
              ))
              }
            </div>

          </div>
          <div className="flex-grow flex flex-col mx-auto justify-center items-center text-center p-4 sm:p-20">
            <h1 className="text-xl sm:text-8xl font-bold">
              <span className="text-black">Your Health, Your </span>
              <span className="text-custom-blue">VitalLog</span>
            </h1>
            <div className="py-10">
              <p className="text-md sm:text-xl my-3 sm:my-1 font-bold">강한 몸을 만들고, 다른 나를 나아가는 여정을 기록하세요.</p>
              <p className="text-md sm:text-xl mb-3 sm:mb-3 font-bold">운동의 순간, 미래의 당신을 위한 건강일지입니다.</p>
            </div>
            <div className="w-full flex justify-center items-center">
              <button onClick={GoToMyPage} className="bg-white text-md sm:text-xl hover:bg-sky-100 text-black border border-custom-blue font-bold py-2 px-8 sm:px-10 rounded-3xl">
                My Page &gt;
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserPage;
