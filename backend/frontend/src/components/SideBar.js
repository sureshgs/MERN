import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSideBarContext } from "../hooks/useSideBarContext";
import "./SideBar.css"

export default function SideBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { sidebar,dispatch } = useSideBarContext(); 
  
  const handleClick = () => {
    logout();
    console.log(user)
    dispatch({type:'CLOSE_SIDEBAR', payload:!sidebar})
  };

  return (
    <div className={`sidebar ${sidebar ? "sidebar-open" : "sidebar-close"}`}>
      {!user && (
        <div className="p-10 flex flex-col mt-12 gap-4 absolute w-full">
          <Link to="/" className="p-3 w-full focus:bg-black focus:text-white focus:rounded-lg">
            Home
          </Link>
          <Link to="/signup" className="p-3 focus:bg-black focus:text-white focus:rounded-lg">
            About
          </Link>
          <Link to="/signup" className="p-3 focus:bg-black focus:text-white focus:rounded-lg">
            Blog
          </Link>
          <Link to="/login" className="p-3 focus:bg-black focus:text-white focus:rounded-lg">
            Login
          </Link>
          <Link to="/signup" className="p-3 focus:bg-black focus:text-white focus:rounded-lg">
            Signup
          </Link>
          <Link to="/signup" className="p-3 focus:bg-black focus:text-white focus:rounded-lg">
            Community
          </Link>
        </div>
      )}
      {user && (
        <div className="p-10 flex flex-col mt-12 gap-4 absolute w-3/4">
          <span>{user.email}</span>
          <button onClick={handleClick} className="btn">Log out</button>
        </div>
      )}
    </div>
  );
}
