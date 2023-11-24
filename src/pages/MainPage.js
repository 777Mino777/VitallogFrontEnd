import { useNavigate } from "react-router-dom";
import VlogNav from "./VlogNav";
import { useEffect } from "react";
const MainPage = () => {

    const navigate = useNavigate();

    const GoToRegisterPage = () => {
        navigate("/register")
    }

    return (
        <div className="max-w-[1820px] mx-auto">
            <div className="flex flex-col min-h-screen bg-white text-gray-800">
                <header className="p-4 sm:p-6">
                    <VlogNav isUserPage={false} />
                </header>
                <main className="flex-grow flex flex-col mx-auto justify-center items-center text-center p-4 sm:p-20">
                    <h1 className="text-xl sm:text-8xl font-bold py-10">
                        <span className="text-black">Your Health, Your </span>
                        <span className="text-custom-blue">VitalLog</span>
                    </h1>
                    <div className="py-10">
                        <p className="text-md sm:text-xl my-3 sm:my-1 font-bold">강한 몸을 만들고, 다른 나를 나아가는 여정을 기록하세요.</p>
                        <p className="text-md sm:text-xl mb-3 sm:mb-3 font-bold">운동의 순간, 미래의 당신을 위한 건강일지입니다.</p>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <button onClick={GoToRegisterPage} className="bg-white text-md sm:text-xl hover:bg-gray-200 text-black border border-custom-blue font-bold py-2 px-8 sm:px-10 rounded-3xl">
                            Sign up &gt;
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MainPage;
