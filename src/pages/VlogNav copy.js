// import { Link, NavLink } from "react-router-dom"
// import { useNavigate } from "react-router-dom";
// import { LoginStateAtom } from "../components/user/LoginStateAtom";
// import { useRecoilState } from "recoil";

// const VlogNav = ({ isUserPage }) => {
//     const navigate = useNavigate();

//     const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginStateAtom);

//     const handleLogin = () => {
//         navigate("/login")
//     }

//     const handleLogout = () => {
//         localStorage.removeItem("token")
//         localStorage.removeItem("id")
//         localStorage.removeItem("name")

//         setIsLoggedIn(false);
//         navigate("/");
//     }

//     const handleLoginButton = isLoggedIn ? handleLogout : handleLogin

//     return (
//         <nav className="flex items-center gap-4 sm:gap-8 md:gap-14 lg:gap-44 group">

//             <Link to={isLoggedIn ? "/user" : "/"} className="vitallog-logo sm:text-3xl md:text-5xl lg:text-7xl hover:cursor-pointer group-hover:scale-x-110 transition-all hover:text-custom-blue text-black font-bold py-2 px-2">
//                 VitalLog
//             </Link>
        
//             <NavLink to={isLoggedIn ? "/community" : "/login"}
//                 activeClassName="active"
//                 className={({ isActive }) => isActive
//                     ? "sm:flex-row sm:w-auto text-black bg-gray-100 text-md sm:text-sm md:text-xl lg:text-2xl font-bold py-1 sm:py-2 px-2 rounded ml-14 menu-item group-hover:opacity-100"
//                     : "sm:flex-row sm:w-auto text-black hover:bg-gray-100 text-md sm:text-sm md:text-xl lg:text-2xl font-bold py-1 sm:py-2 px-2 rounded ml-14 menu-item group-hover:opacity-100"}>
//                 COMMUNITY
//             </NavLink>

//             <NavLink to="/information"
//                 activeClassName="active"
//                 className={({ isActive }) => isActive 
//                     ? "sm:flex-row sm:w-auto text-black bg-gray-100 text-md sm:text-sm md:text-xl lg:text-2xl font-bold py-1 sm:py-2 px-2 rounded menu-item group-hover:opacity-100"
//                     : "sm:flex-row sm:w-auto text-black hover:bg-gray-100 text-md sm:text-sm md:text-xl lg:text-2xl font-bold py-1 sm:py-2 px-2 rounded menu-item group-hover:opacity-100"}>
//                 INFORMATION
//             </NavLink>

//             <NavLink to={isLoggedIn ? "/mypage" : "/login"}
//                 activeClassName="active"
//                 className={({ isActive }) => isActive
//                     ? "sm:flex-row sm:w-auto text-black bg-gray-100 text-md sm:text-xs md:text-xl lg:text-2xl font-bold py-1 sm:py-2 px-2 rounded menu-item group-hover:opacity-100"
//                     : "sm:flex-row sm:w-auto text-black hover:bg-gray-100 text-md sm:text-xs md:text-xl lg:text-2xl font-bold py-1 sm:py-2 px-2 rounded menu-item group-hover:opacity-100"}>
//                 MY PAGE
//             </NavLink>
//             <button onClick={handleLoginButton} className="sm:flex-row sm:w-auto bg-custom-blue text-2xl border-2 hover:border-custom-blue hover:bg-white text-white hover:text-custom-blue font-bold py-1 px-10 rounded-2xl mr-10 md:w-36 lg:w-48 transition duration-500">
//                 {isLoggedIn ? "Logout" : "Login"}
//             </button>
//         </nav>
//     )
// };

// export default VlogNav