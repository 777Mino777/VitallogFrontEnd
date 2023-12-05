import React, { useEffect, useState } from 'react';
import VlogNav from './VlogNav';
import '../css/tablestyle.css'
import debounce from 'lodash.debounce';

const InformationPage = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [userInfo, setUserInfo] = useState([]);

  const readyExercises = userInfo.filter(user => user.exerciseStep === "준비운동");
  const mainExercises = userInfo.filter(user => user.exerciseStep === "본운동");
  const finishExercises = userInfo.filter(user => user.exerciseStep === "마무리운동")

  useEffect(() => {
    if (height || weight || gender || age) {
      fetchData();
    }
  }, [height, weight, gender, age])

  const fetchData = debounce(() => {
    const url = `http://10.125.121.216:8080/api/vitallog/information?age=${age}&bmi=${bmi}&gender=${gender}`

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => console.error('Error', error));
  }, 500)

  const heightInMeters = height / 100;
  const checkBmi = height && weight ? (weight / (heightInMeters * heightInMeters)).toFixed(2) : " ";

  const calcBmi = (height, weight) => {
    if (height === '' || weight === '')
      return '';

    if (checkBmi >= 35.0)
      return "3단계비만"
    else if (checkBmi <= 34.9 && checkBmi >= 30.0)
      return "2단계비만"
    else if (checkBmi <= 29.9 && checkBmi >= 25.0)
      return "1단계비만"
    else if (checkBmi <= 24.9 && checkBmi >= 23.0)
      return "과체중"
    else if (checkBmi <= 22.9 && checkBmi >= 18.5)
      return "정상"
    else
      return "저체중"
  }

  const bmi = calcBmi(height, weight);

  console.log(userInfo)
  return (
    <div className="max-w-[1820px] mx-auto">
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
        <header className="p-2 sm:p-6">
          <VlogNav />
        </header>
        <div className='px-20 mx-20 mt-10'>
          <div className='mx-20 text-2xl font-bold'>추천 운동 목록 보기</div>
          <div className="flex justify-center gap-5 mb-5">
            <select className='border-2 border-[#A6A6A6] px-2 h-12 text-md  text-center rounded-2xl transition duration-300 hover:border-custom-blue' value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="" className='hidden'>성별</option>
              <option value="">선택없음</option>
              <option value="M">남자</option>
              <option value="F">여자</option>
            </select>
            <select className='border-2 border-[#A6A6A6] px-2 h-12 text-md text-center rounded-2xl transition duration-300 hover:border-custom-blue'
              value={age} onChange={(e) => setAge(e.target.value)}>
              <option value="" className='hidden'>나이</option>
              <option value="">선택없음</option>
              <option value="10대" >10대</option>
              <option value="20대" >20대</option>
              <option value="30대" >30대</option>
              <option value="40대" >40대</option>
              <option value="50대" >50대</option>
              <option value="60대" >60대</option>
              <option value="70대 이상" >70대 이상</option>
            </select>
            <input id='idkey'
              className='border-2 border-[#A6A6A6] px-2 w-[120px] h-12 text-md text-center rounded-2xl transition duration-300 hover:border-custom-blue'
              type="number"
              placeholder="키 (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <input id='weightkey'
              className='border-2 border-[#A6A6A6] px-2 w-[120px] h-12 text-md text-center rounded-2xl transition duration-300 hover:border-custom-blue'
              type="number"
              placeholder="몸무게 (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            
            <section className='flex text-lg px-4 border-2 rounded-2xl text-center items-center text-gray-500 justify-start border-[#A6A6A6] bg-gray-100'>
              <pre className='text-black'>BMI : </pre> <span className='text-custom-blue font-bold'> {checkBmi}</span> {checkBmi && bmi ? '\u00A0|\u00A0' : ''}  <span className='text-custom-blue font-bold'>{bmi}</span>
            </section>
          </div>
          <h1 className="pb-4 text-gray-400 text-center text-sm">선택하지 않은 항목은 모든 옵션이 포함됩니다.</h1>

          <div className='text-lg font-bold grid-container mb-1 mx-20'>
            <div className='py-2  bg-ready-blue text-white rounded-xl grid-item'>준비운동</div>
            <div className='py-2 bg-main-blue  text-white rounded-xl grid-item'>본운동</div>
            <div className='py-2  bg-finish-blue text-white rounded-xl grid-item'>마무리운동</div>
          </div>


          <div className='grid-container h-[520px] mx-20 overflow-auto no-scrollbar'>
            <div className='text-md grid-item'>
              {readyExercises.map((exercise, index) => (
                <div className='mb-3 py-1 rounded-xl border-2 border-ready-blue' key={index}>{exercise.exerciseType}</div>
              ))}
            </div>
            <div className='text-md grid-item'>
              {mainExercises.map((exercise, index) => (
                <div className='mb-3 py-1 rounded-xl border-2 border-main-blue' key={index}>{exercise.exerciseType}</div>
              ))}
            </div>
            <div className='text-md grid-item'>
              {finishExercises.map((exercise, index) => (
                <div className='mb-3 py-1 rounded-xl  border-2 border-finish-blue' key={index}>{exercise.exerciseType}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default InformationPage;
