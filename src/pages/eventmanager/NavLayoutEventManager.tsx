import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";


const NavLayoutEventManager = () => {


    return (
        <div className="w-full">
            <div className="w-full h-[7%] bg-black block box-border">
            </div>
            <div className="flex w-full h-full gap-5">
                <Navbar role="EVENTMANAGER" />
                <div className="">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default NavLayoutEventManager;
