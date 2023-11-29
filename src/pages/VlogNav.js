import { Link, NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
const VlogNav = ({ isUserPage }) => {


    const navigate = useNavigate();

    const isLoggedIn = () => {
        return localStorage.getItem('token') != null;
    };

    const handleLogin = () => {
     
        navigate("/login")
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("id")
       
        navigate("/");
    }

    const handleVitalLogClick = () => {
        if (isLoggedIn()) {
            navigate("/user");
        } else {
            navigate("/");
        }
    };

    const handleLoginButton = isUserPage ? handleLogout : handleLogin

    return (
        <nav className="flex items-center gap-44">
            <NavLink to="/community"
                className={({ isActive }) => isActive
                    ? "text-white bg-custom-gradient text-md sm:text-2xl font-bold py-1 sm:py-2 px-2 rounded ml-14"
                    : "text-black hover:bg-gray-100 text-md sm:text-2xl font-bold py-1 sm:py-2 px-2 rounded ml-14"}>
                COMMUNITY
            </NavLink>
            <NavLink to="/mypage"
                className={({ isActive }) => isActive
                    ? "text-white bg-custom-gradient text-md sm:text-2xl font-bold py-1 sm:py-2 px-2 rounded"
                    : "text-black hover:bg-gray-100 text-md sm:text-2xl font-bold py-1 sm:py-2 px-2 rounded"}>
                MY PAGE
            </NavLink>
            <Link to="/" onClick={handleVitalLogClick} className=" sm:text-7xl hover:cursor-pointer hover:scale-x-110 transition-all hover:text-custom-blue text-black font-bold py-2 px-2">
                VitalLog
            </Link>
            <NavLink to="/information"
                className={({ isActive }) => isActive ? "text-white bg-custom-gradient text-md sm:text-2xl font-bold py-1 sm:py-2 px-2 rounded"
                    : "text-black hover:bg-gray-100 text-md sm:text-2xl font-bold py-1 sm:py-2 px-2 rounded"}>
                INFORMATION
            </NavLink>
            <button onClick={handleLoginButton} className="bg-custom-blue text-2xl hover:border-4 hover:border-custom-blue hover:bg-white text-white hover:text-custom-blue font-bold py-1 px-10 rounded-2xl mr-10 w-48 transition duration-500">
                {isUserPage ? "Logout" : "Login"}
            </button>
        </nav>
    )
};

export default VlogNav
