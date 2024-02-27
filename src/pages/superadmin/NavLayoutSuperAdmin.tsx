import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";


const NavLayoutSuperAdmin = () => {


    return (
        <div className="w-full">
            <div className="w-full h-[7%] bg-black block box-border">
            </div>
            <div className="flex w-full h-full gap-5">
                <Navbar role="SUPERADMIN" />
                <div className="">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default NavLayoutSuperAdmin;
