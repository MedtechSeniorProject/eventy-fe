import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";


const NavLayoutSuperAdmin = () => {


    return (
        <div className="w-full">
            <div className="w-full fixed h-[7%] bg-black block box-border">
            </div>
            <div className="flex">
                <Navbar role="SUPERADMIN" />
                <Outlet />
            </div>
        </div>
    );
};

export default NavLayoutSuperAdmin;
