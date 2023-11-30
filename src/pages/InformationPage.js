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

  // const calcAge = (age) => {
  //   let n = Math.floor(age / 10);
  //   return n + '0대'
  // }

  // const testTable = [
  //   {
  //     gender: "여자", age : "30대", bmi : "정상", exerciseStep: "중간", exerciseType: "달리기"
  //   },
  // ];

  const isLoggedIn = () => {
    return localStorage.getItem('token') != null;
  }

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
  // const handleView = async () => {

  //   console.log(age)


  //   const url = `http://ip:8080/api/vitallog/information?age=${age}&bmi=${bmi}&gender=${gender}`

  //   fetch(url)
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setUserInfo(data);
  //     })
  //     .catch((error) => console.error('Error', error));



  // };

  console.log(userInfo)
  return (
    <div className="max-w-[1820px] mx-auto">
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
        <header className="p-2 sm:p-6">
          {isLoggedIn ?
            <VlogNav isUserPage={true} />
            :
            <VlogNav isUserPage={false} />
          }
        </header>

        <h1 className="font-omyu_pretty mx-16 pb-4 pt-10 text-gray-400 font-bold">선택하지 않은 경우 모든 옵션을 포함하는 정보를 볼 수 있습니다.</h1>

        <div className="font-omyu_pretty form flex justify-center pb-20 space-x-16">
          <select className='border-4 font-bold w-58 px-20 py-6 text-3xl rounded-2xl border-black transition duration-300 hover:border-custom-blue' value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="" className='hidden'>성별</option>
            <option value="">선택없음</option>
            <option value="M">남자</option>
            <option value="F">여자</option>
          </select>
          <select className='border-4 font-bold w-58 px-20 py-6 text-3xl rounded-2xl border-black transition duration-300 hover:border-custom-blue'
            value={age} onChange={(e) => setAge(e.target.value)}>
            <option value="" className='hidden'>나이</option>
            <option value="">선택없음</option>
            <option value="10대" className='text-start'>10대</option>
            <option value="20대" className='text-start'>20대</option>
            <option value="30대" className='text-start'>30대</option>
            <option value="40대" className='text-start'>40대</option>
            <option value="50대" className='text-start'>50대</option>
            <option value="60대" className='text-start'>60대</option>
            <option value="70대 이상" className='text-start'>70대 이상</option>
          </select>
          <input id='idkey'
            className='border-4 text-center font-bold w-64 pl-4 py-6 text-3xl rounded-2xl border-black transition duration-300 hover:border-custom-blue'
            type="number"
            placeholder="키 (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <input id='weightkey'
            className='border-4 text-center font-bold w-64 pl-4 py-6 text-3xl rounded-2xl border-black transition duration-300 hover:border-custom-blue'
            type="number"
            placeholder="몸무게 (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <section className='mx-14 flex text-3xl text-gray-500 justify-start bg-sky-100 border-custom-blue font-bold pl-4 w-96 py-6 border-4 rounded-xl'><pre className='text-black'>BMI : </pre> {checkBmi} {checkBmi && bmi ? '\u00A0|\u00A0' : ''} {bmi}</section>
          {/* <button className='border-4 px-12 py-6 font-bold text-white text-2xl rounded-2xl bg-custom-blue border-custom-blue transition duration-300 hover:text-custom-blue hover:border-custom-blue hover:bg-white' onClick={handleView}>
            보기
          </button> */}
        </div>

        <div className='font-omyu_pretty text-3xl font-bold grid-container'>
          <div className='bg-ready-blue py-6 mb-6 text-white rounded-xl grid-item'>준비운동</div>
          <div className='bg-main-blue py-6 mb-6 text-white rounded-xl grid-item'>본운동</div>
          <div className='bg-finish-blue py-6 mb-6 text-white rounded-xl grid-item'>마무리운동</div>
        </div>


        <div className='font-omyu_pretty grid-container'>
          <div className='text-2xl font-bold grid-item'>
            {readyExercises.map((exercise, index) => (
              <div className='rounded-xl py-4 border-4 border-ready-blue mb-8' key={index}>{exercise.exerciseType}</div>
            ))}
          </div>
          <div className='text-2xl font-bold grid-item'>
            {mainExercises.map((exercise, index) => (
              <div className='rounded-xl py-4 border-4 border-main-blue mb-8' key={index}>{exercise.exerciseType}</div>
            ))}
          </div>
          <div className='text-2xl font-bold grid-item'>
            {finishExercises.map((exercise, index) => (
              <div className='rounded-xl py-4 border-4 border-finish-blue mb-8' key={index}>{exercise.exerciseType}</div>
            ))}
          </div>
        </div>


      </div>
    </div >
  );
};

export default InformationPage;
