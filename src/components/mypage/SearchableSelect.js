import { useEffect, useRef, useState } from "react";

const SearchableSelect = ({setMet, setExerid}) => {
    const [exerData, setExerData] = useState();
    const [optionTags, setOptionTags] = useState(); 

    useEffect(() => {
        fetch("http://10.125.121.216:8080/api/vitallog/mypage/exercise", {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                Authorization: localStorage.getItem("token")
            }
        })
            .then(resp => resp.json())
            .then(data => setExerData(data));
    }, [])

    useEffect(()=>{
        if(!exerData) return;
        setOptionTags(exerData.map(ex=><option key={ex.id} value={ex.exercise} />));
    },[exerData])

    const test = (e) => {
        let selectExercise = exerData.filter(ex=>{
            if(ex.exercise===e.target.value) return ex
        })
        if(selectExercise[0]!==undefined){
            console.log(selectExercise[0]);        
            setExerid(selectExercise[0].id)
            setMet(selectExercise[0].met)
        }
    }
    return (
        <div className="p-5  flex flex-col justify-center ">
             <div className="flex justify-start text-lg font-bold mb-3">운동종류</div>
            <input onChange={(e) => test(e)} type="text" list="list" id="exercise"
                    placeholder="운동 종류를 선택해주세요."
                    className="border border-[#000] h-10 rounded-full text-center w-full"/>
            <datalist id="list">
                {optionTags}
            </datalist>
        </div>
    )
}

export default SearchableSelect
