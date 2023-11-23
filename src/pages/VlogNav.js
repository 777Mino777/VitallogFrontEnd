import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
const VlogNav = ({isUserPage}) => {


    const navigate = useNavigate();

    // const isLoggedIn = () => {
    //     return localStorage.getItem('token') != null;
    // };

    const handleLogin = () => {
        navigate("/login")
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        navigate("/main");

    }

    const handleLoginButton = isUserPage ? handleLogout : handleLogin

    return (
        <nav className="flex items-center justify-between">
            {/* {isLoggedIn() ? (
                <>
                    <Link to="/community" className="text-black hover:bg-gray-100 text-md sm:text-2xl font-bold py-1 sm:py-2 px-2 rounded ml-14">
                        COMMUNITY
                    </Link>
                    <Link to="/mypage" className="text-black hover:bg-gray-100 text-md sm:text-2xl font-bold py-1 sm:py-2 px-2 rounded">
                        MY PAGE
                    </Link>
                    <Link to="/main" className=" sm:text-7xl hover:cursor-pointer hover:scale-x-110 transition-all hover:text-custom-blue text-black font-bold py-2 px-2">
                        VitalLog
                    </Link>
                    <Link to="/information" className="text-black hover:bg-gray-100 text-md sm:text-2xl font-bold py-1 sm:py-2 px-2 rounded">
                        INFORMATION
                    </Link>
                    <button onClick={handleLogout} className="bg-custom-blue text-md sm:text-2xl hover:bg-sky-300 text-white font-bold py-1 px-3 sm:px-9 rounded-2xl mr-14">
                        Logout
                    </button>
                </>
            ) : (
                <> */}
                    <Link to="/community"  className="text-black hover:bg-gray-100 text-md sm:text-2xl font-bold py-1 sm:py-2 px-2 rounded ml-14">
                        COMMUNITY
                    </Link>
                    <Link to="/mypage" className="text-black hover:bg-gray-100 text-md sm:text-2xl font-bold py-1 sm:py-2 px-2 rounded">
                        MY PAGE
                    </Link>
                    <Link to="/main" className=" sm:text-7xl hover:cursor-pointer hover:scale-x-110 transition-all hover:text-custom-blue text-black font-bold py-2 px-2">
                        VitalLog
                    </Link>
                    <Link to="/information" className="text-black hover:bg-gray-100 text-md sm:text-2xl font-bold py-1 sm:py-2 px-2 rounded">
                        INFORMATION
                    </Link>
                    {/* <Link to={isUserPage ? "/main" : "/login"} className="bg-custom-blue text-md sm:text-2xl hover:bg-sky-300 text-white font-bold py-1 px-3 sm:px-9 rounded-2xl mr-14">
                        {isUserPage ? "Logout" : "Login"}
                    </Link> */}
                    <button onClick={handleLoginButton} className="bg-custom-blue text-md sm:text-2xl hover:bg-sky-300 text-white font-bold py-1 px-3 sm:px-9 rounded-2xl mr-14">
                        {isUserPage ? "Logout" : "Login"}
                    </button>
                {/* </>
            )
            }; */}
        </nav>
    )
};

export default VlogNav
