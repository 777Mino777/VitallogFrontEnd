import { useNavigate } from "react-router-dom";
import VlogNav from "./VlogNav";
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

  }, [userid])



  const GoToMyPage = () => {
    navigate("/mypage")
  }

  const filledExerciseRecords = new Array(3).fill({}).map((_, index) => {
    return exerciseRecords[index] || { exerDate: '', exercise: '', exerTime: '', kcal: '' };
  });

  return (
    <div className="max-w-[1820px] mx-auto">
      <div className="flex flex-col min-h-screen text-gray-800">
        <header className="p-2 sm:p-6">
          <VlogNav />
        </header>
        <main className="grow flex justify-center items-center">
          <div className=" h-[680px] grid grid-cols-1 lg:grid-cols-2 gap-5 mx-20 px-20 items-center">
            <div className="order-2 lg:order-1 flex flex-col justify-between bg-[url('./images/main.jpg')] bg-cover h-full p-10 mr-10 rounded-xl shadow-md">
              <div className="items-center">
                <div className="font-yg-jalnan text-2xl font-bold text-[#666666] mt-4">
                  {username}님
                  <span className="text-lg"> 어서오세요</span>
                </div>
                <div className="text-[#919191] font-omyu_pretty text-lg">
                건강과 운동을 기록하며 함께 성장하는 Vital Log 입니다.
                </div>
              </div>

              <div>
                <div className="font-bold text-2xl mb-5 text-[#e2e0e0] ">Log</div>

                <div id="exercisedata" className="flex-col ">
                  {filledExerciseRecords.map((record, index) => (
                    <div key={index} className="grid grid-cols-4 py-2 px-8 mb-5 rounded-xl text-center items-center justify-between bg-white text-lg font-bold bg-opacity-70 ">
                      <div>{record.exerDate ? `${record.exerDate}` : '🏃‍♂️'}</div>
                      {
                        record.exercise
                          ?
                          <>
                            <div className="truncate">{record.exercise}</div>
                            <div>{record.exerTime}분</div>
                          </>
                          :
                          <div className="col-span-2">운동기록을 채워봐요!</div>
                      }
                      <div>{record.kcal ? `${record.kcal}kcal` : '🏃‍♀️'}</div>
                    </div>
                  ))
                  }
                </div>
              </div>
            </div>
            <div className="order-1 flex-grow flex flex-col justify-center items-center text-center sm:p-20">
              <h1 className="text-xl sm:text-7xl font-extrabold">
                <div className="mb-4">Your Health,</div>
                <div className="">Your <span className="text-custom-blue">VitalLog</span></div>
              </h1>
              <div className="py-10">
                <p className="text-md sm:text-lg my-3 sm:my-1 font-bold">강한 몸을 만들고, 다른 나로 나아가는 여정을 기록하세요.</p>
                <p className="text-md sm:text-lg mb-3 sm:mb-3 font-bold">운동의 순간, 미래의 당신을 위한 건강일지입니다.</p>
              </div>
              <div className="w-full flex justify-center items-center">
                <button onClick={GoToMyPage} className="bg-white text-md text-black border-2 border-custom-blue font-extrabold py-2 px-8 sm:px-10 rounded-3xl hover:bg-custom-blue hover:text-white">
                  My Page &gt;
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserPage;
