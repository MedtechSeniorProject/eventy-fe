import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import { Outlet } from "react-router-dom";


const NavLayoutEventManager = () => {
    return (
        <div className="w-full">
         <img className="absolute top-0 right-0 w-20 md:w-28 lg:w-30" src="/assets/nav_arrow_top.png" alt="image"/>
         <TopBar/>
            <div className="flex">
                <Navbar role="EVENTMANAGER" />
                <div className="flex-1 mt-40 ml-[25%]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default NavLayoutEventManager;
