import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSideBarContext } from "../hooks/useSideBarContext";
import { useState } from "react";

const Navbar = () => {
  const {dispatch} = useSideBarContext()
  const [sidebar,setSidebar] = useState(false);
  
  const handleSideBar = () => {
    setSidebar(!sidebar);
    dispatch({ type: 'CLOSE_SIDEBAR', payload: !sidebar });
  }
  
  return (
    <div className="flex justify-between items-center flex-wrap bg-white p-6 relative">
      <div>
        <Link to="/">
          <h1 className="text-xl font-bold tracking-wide ml-8">&lt;DevLab&gt;</h1>
        </Link>
      </div>

      <button className="cursor-pointer mr-10">
        <RxHamburgerMenu size={22} className="font-bold" onClick={handleSideBar}/>
      </button>
     
    </div>
      
  );
};

export default Navbar;
