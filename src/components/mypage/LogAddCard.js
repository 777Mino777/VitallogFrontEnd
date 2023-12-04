import { useNavigate } from "react-router-dom";
import { FaWaveSquare } from "react-icons/fa6";

const LogAddCard = () => {
    const navigate = useNavigate();

    const linkAddLog =()=> {
        navigate("/today")
    }
    return (
        <div className="items-center flex flex-col">
            <div onClick={linkAddLog}
                className="w-[280px] h-[300px] bg-[#f7faff] transition-all hover:bg-[#0085C9] hover:text-white border rounded-lg flex flex-col justify-center items-center p-5 pt-8">
                <FaWaveSquare className="text-2xl" />

                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-center">오늘의 운동을</div>
                    <div className="font-bold text-xl mb-2 text-center">기록해볼까요?</div>
                    <p className="text-gray-700 text-center">
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LogAddCard
