import { useNavigate } from "react-router-dom";
import VlogNav from "./VlogNav";
const MainPage = () => {

    const isLoggedIn = () => {
        return localStorage.getItem("token" != null);
    }

    const navigate = useNavigate();

    const GoToRegisterPage = () => {
        navigate("/register")
    }

    return (
        <div className="max-w-[1820px] mx-auto">
            <div className="flex flex-col min-h-screen bg-white text-gray-800">
                <header className="p-6">
                    <VlogNav />
                </header>
                <main className="grow flex flex-col my-auto justify-center items-center text-center mr-10">
                    <h1 className="text-xl sm:text-7xl font-bold mb-16">
                        <div>Your Health, Your <span className="text-custom-blue">VitalLog</span></div>
                    </h1>
                    <div className="mb-16">
                        <p className="text-md sm:text-xl mb-4 text-[#555555] font-bold ">강한 몸을 만들고, 다른 나로 나아가는 여정을 기록하세요.</p>
                        <p className="text-md sm:text-md text-[#555555] font-bold ">운동의 순간, 미래의 당신을 위한 건강일지입니다.</p>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <button onClick={GoToRegisterPage} className="bg-white text-md  hover:bg-custom-blue hover:text-white text-black border-2 border-custom-blue font-extrabold py-2 px-8 sm:px-10  rounded-3xl">
                            Sign up &gt;
                        </button>
                    </div>
                    
                </main>
            </div>
        </div>
    );
}

export default MainPage;
