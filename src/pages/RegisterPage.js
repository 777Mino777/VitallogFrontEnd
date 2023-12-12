import axios from "axios";
import InputField from "../components/InputField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";


const RegisterPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isIdValid, setIsIdValid] = useState(null || '');

    const navigate = useNavigate();

    const backToMainPage = () => {
        navigate("/");
    }

    const backToLoginPage = () => {
        navigate("/login");
    }


    const handleRegister = async (event) => {
        event.preventDefault();

        if (!id || !password || !name) {
            setModalMessage('모든 정보를 입력해주세요.');
            setShowModal(true);
            return;
        }

        if (password !== confirmPassword) {
            setModalMessage('패스워드가 일치하지 않습니다.');
            setShowModal(true);
            return;
        }

        try {
            const response = await axios.post('http://10.125.121.216:8080/api/vitallog/register', {
                id, password, name
            });

            if (response.status === 200) {
                setModalMessage('회원가입이 완료되었습니다!');
                setShowModal(true);

                setTimeout(() => {
                    setShowModal(false);
                    navigate('/login');
                }, 1000);
            } else {
                setModalMessage('회원가입 처리 중 문제가 발생했습니다.');
                setShowModal(true);
            }
        } catch (error) {
            setModalMessage('중복된 정보가 있습니다.');
            setShowModal(true);
        }

    };
    const checkIdAvailability = async (e) => {
        e.preventDefault();

        if (!id.trim()) {
            setIsIdValid(null);
            return;
        }

        console.log("ee")
        try {
            const response = await axios.get(`http://10.125.121.216:8080/api/vitallog/check-id?id=${id}`);
            console.log(response)
            setIsIdValid(response.status === 200);
        } catch (error) {
            setIsIdValid(false);
        }
    };

    return (
        <div className="bg-custom-gradient gradient-background flex min-h-screen justify-center items-center">
            <div className="gradient-layer"></div>
            <div className="gradient-layer"></div>
            <div className="p-14 bg-white rounded-xl shadow-md relative py-24 sm:w-1/4 md:w-2/3 lg:w-1/2 xl:w-1/4 3xl:w-1/5">
                <h1 onClick={backToMainPage} className="text-center hover:cursor-pointer hover:scale-x-110 transition-all hover:text-custom-blue text-5xl font-bold mb-4">Vital Log</h1>
                <h2 className="text-center text-xl font-bold mb-8">Sign up</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <div className="flex">
                            <label htmlFor="id" className="block text-start text-gray-700 text-sm font-bold mb-2" >
                                ID
                            </label>

                            {isIdValid === null || id === '' ? '' :
                                isIdValid ?
                                    <div className="ml-4 w-[10rem] mt-[0.2rem] text-xs text-green-600">사용가능한 아이디입니다.</div> :
                                    <div className="ml-4 w-[10rem] mt-[0.2rem] text-xs text-red-600">중복된 아이디가 있습니다.</div>}
                        </div>
                        <input
                            type="text"
                            id="id"
                            className="shadow-md appearance-none border-4 border-gray-400 rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="아이디를 입력하세요."
                            value={id}
                            onChange={(e) => {
                                setId(e.target.value);
                                if (e.target.value === '') {
                                    setIsIdValid(null);
                                }
                            }}
                            onBlur={checkIdAvailability}
                        />
                    </div>

                    <InputField
                        label="PASSWORD"
                        id="password"
                        type="password"
                        placeholder="패스워드를 입력하세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputField
                        label="CONFIRM PASSWORD"
                        id="confirmpassword"
                        type="password"
                        placeholder="패스워드를 한번 더 입력하세요."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputField
                        label="NAME"
                        id="name"
                        type="text"
                        placeholder="이름을 입력하세요."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500
                                       hover:bg-sky-400
                                       text-white
                                       font-bold py-2 px-4
                                       rounded focus:outline-none
                                       focus:shadow-outline w-full"
                        >
                            Register
                        </button>
                    </div>
                    <div className="text-center">
                        <button onClick={backToLoginPage}
                            className="inline-block
                                 mt-5 align-baseline
                                 font-bold text-sm
                                 text-blue-500 hover:text-blue-800">
                            로그인 화면
                        </button>
                    </div>
                </form>
                {showModal && (
                    <Modal title="알림" onClose={() => setShowModal(false)}>
                        <p>{modalMessage}</p>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default RegisterPage;
