import { useNavigate } from "react-router-dom";
import VlogNav from "./VlogNav";
import RunningMan from "../components/RunningMan";
import { useEffect } from "react";
const UserPage = () => {

  const navigate = useNavigate();

  const GoToMyPage = () => {
    navigate("/mypage")
  }

  return (
    <div className="max-w-[1820px] mx-auto">
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
        <header className="p-2 sm:p-6">
          <VlogNav isUserPage={true}/>
        </header>
        <main className="flex my-12 py-24">
          <div className="mx-10 bg-custom-gradient border-4 mb-1 border-black bg-white rounded-xl shadow-md relative sm:w-1/4 md:w-2/3 lg:w-1/2 xl:w-2/3 3xl:w-1/5">
            <button className=" bg-white m-24 p-1 border-4  border-black rounded-[50%] w-53 h-48">
              <RunningMan />
            </button>
            <div>

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
              <button onClick={GoToMyPage} className="bg-white text-md sm:text-xl hover:bg-gray-200 text-black border border-custom-blue font-bold py-2 px-8 sm:px-10 rounded-3xl">
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
