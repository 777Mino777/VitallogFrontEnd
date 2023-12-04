import axios from "axios";
import { BiDumbbell } from "react-icons/bi";
import { FiMinusCircle } from "react-icons/fi";

const LogCard = ({ exer, time, kcal, seq }) => {
    const exertime = time >= 60 ? `${Math.floor(time / 60)}시간 ${time % 60}분` : `${time}분`;
    
    console.log()
    const deleteLog = () => {
        if(window.confirm('해당 로그를 삭제할까요?')){
            const url = `http://10.125.121.216:8080/api/vitallog/mypage/${seq}`;
            fetch(url, {
                method : 'DELETE',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": localStorage.getItem("token"),
                  }
            }).then(resp=>window.location.reload())
            .catch(err=>console.log(err))
        } 
    }
    return (
        <div className="items-center flex flex-col">
            <div className="w-[280px] h-[300px] border shadow-md rounded-lg flex flex-col p-5 ">
                <div className="w-full flex justify-end">
                    <button onClick={deleteLog} className="text-[#e0e0e0] hover:text-[#D4573A]">
                        <FiMinusCircle />
                    </button>
                </div>
                <div className="h-full flex flex-col justify-center items-center">
                    <div className="text-[40px] border-2 border-custom-blue w-[80px] h-[80px] rounded-full flex flex-col justify-center items-center">
                        <BiDumbbell />
                    </div>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-center">{exer}</div>
                        <p className="font-semibold text-lg mb-2 text-gray-700 text-center">
                            {exertime}
                        </p>
                        <p className="font-semibold text-lg text-gray-700 text-center">
                            {kcal} kcal
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LogCard
