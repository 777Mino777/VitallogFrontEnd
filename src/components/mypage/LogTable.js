import { FiMinusCircle } from "react-icons/fi";

const LogTable = ({userlog}) => {
    console.log(userlog)
    const deleteLog = (seq) => {
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
    const tbodyTags = userlog && userlog.map((log, idx)=>{
        return <tr key={log.seq} className="odd:bg-white even:bg-gray-50 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {log.exerDate}
                        </th>
                        <td className="px-6 py-4">
                            {log.exerTime} 분
                        </td>
                        <td className="px-6 py-4">
                            {log.exercise}
                        </td>
                        <td className="px-6 py-4">
                            {log.kcal} kcal  
                        </td>
                        <td className="pr-6 pt-5 h-full flex justify-end">
                            <FiMinusCircle onClick={()=>deleteLog(log.seq)} className="hover:text-[#D4573A] hover:cursor-pointer" />
                        </td>
                        
                    </tr>
                    
    })
    return (
        <div className="relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Time(min)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            exercise
                        </th>
                        <th scope="col" className="px-6 py-3">
                            kcal
                        </th>
                        <td className=""> 
                        </td>
                    </tr>
                </thead>
                <tbody>
                    
                    {tbodyTags}
                   
                </tbody>
            </table>
        </div>
    )
}

export default LogTable
