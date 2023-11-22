import React, { useState } from 'react';
import VlogNav from './VlogNav';

const InformationPage = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [userInfo, setUserInfo] = useState([]);


  // const calcAge = (age) => {
  //   let n = Math.floor(age / 10);
  //   return n + '0대'
  // }

  // const testTable = [
  //   {
  //     gender: "여자", age : "30대", bmi : "정상", exerciseStep: "중간", exerciseType: "달리기"
  //   },
  // ];
  
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
  const handleView = async () => {


    // const testage = calcAge(age);
    // const testbmi = '정상';
    console.log(age)

    // setUserInfo();

    const url = `http://10.125.121.216:8080/api/vitallog/information?age=${age}&bmi=${bmi}&gender=${gender}`

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {setUserInfo(data);
      })
      .catch((error) => console.error('Error', error));
    
   
    /*
    try {
      const response = await axios.get(`http://10.125.121.216:8080/api/vitallog/information?age='10대'&bmi=''&gender='${gender}'`, {
        params: { age, bmi, gender }
      });
      // 예상 응답 형태: [{ gender: '여자', age: '30', height: '160', weight: '55' }, ...]
      setUserInfo(response.data);
    } catch (error) {
      console.error('There was an error fetching the user info:', error);
    }
    */
  };

  return (
    <div className="max-w-[1820px] mx-auto">
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
        <header className="p-2 sm:p-6">
          <VlogNav />
        </header>
        <h1 className="mx-16 pb-4 pt-10 text-gray-400 font-bold">선택하지 않은 경우 모든 옵션을 포함하는 정보를 볼 수 있습니다.</h1>
        <div className="form flex justify-center pb-20">
          <table className="flex justify-around">
            <thead className="px-10 space-x-32">
              <select className='border-4 font-bold w-25 px-14 py-6 text-2xl rounded-2xl border-black transition duration-300 hover:border-custom-blue' value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="" className='hidden'>성별</option>
                <option value="">선택없음</option>
                <option value="M">남자</option>
                <option value="F">여자</option>
              </select>
              <select className='border-4 font-bold w-25 px-12 py-6 text-2xl rounded-2xl border-black transition duration-300 hover:border-custom-blue'
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
                className='border-4 text-center font-bold w-60 px-0 py-6 text-2xl rounded-2xl border-black transition duration-300 hover:border-custom-blue'
                type="number"
                placeholder="키 (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <input id='weightkey'
               className='border-4 text-center font-bold w-60 px-0 py-6 text-2xl rounded-2xl border-black transition duration-300 hover:border-custom-blue'
                type="number"
                placeholder="몸무게 (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <button className='border-4 w-25 px-24 py-6 font-bold text-white text-2xl rounded-2xl bg-custom-blue border-custom-blue transition duration-300 hover:text-custom-blue hover:border-custom-blue hover:bg-white' onClick={handleView}>보기</button>
            </thead>
          </table>
        </div>
        <div id="ulalala" className='mx-14 flex pb-4 text-3xl justify-start space-x-16'>
          <section className='border-custom-blue font-bold pl-3 py-3 border-4 rounded-xl w-52'>성별 : {gender}</section>
          <section className='border-custom-blue font-bold pl-3 py-3 border-4 rounded-xl w-72'>나이 : {age}</section>
          <section className='border-custom-blue font-bold pl-3 py-3 border-4 rounded-xl w-96'>BMI :  {checkBmi} {checkBmi && bmi ? '/' : ''} {bmi}</section>
        </div>
        <table className="border-4 border-black text-3xl ml-14 mr-14 text-center mb-24">
          <thead className='bg-sky-300'>
            <tr>
              <th className='border'>성별</th>
              <th className='border'>나이</th>
              <th className='border'>BMI</th>
              <th className='border'>운동단계</th>
              <th className='border'>운동종류</th>
            </tr>
            {/* <tr>&nbsp;</tr> */}
          </thead>
          <tbody className='bg-sky-50'>
            {userInfo.map((user, index) => (
              <tr key={index}>
                <td className='border'>{user.gender}</td>
                <td className='border'>{user.age}</td>
                <td className='border'>{user.bmi}</td>
                <td className='border'>{user.exerciseStep}</td>
                <td className='border'>{user.exerciseType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default InformationPage;
