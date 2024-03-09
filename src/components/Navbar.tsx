import {
  BarChart3,
  Settings,
  UserCircle,
} from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import useAuth from "@/_auth/hook/useAuth";

// superAdmin NavBar List
const navSuperAdminList = [
  {
    name: "Event Managers",
    Icon: UserCircle,
    link: "/eventmanagers",
  },
  {
    name: "Statistics",
    Icon: BarChart3,
    link: "/sastatistics",
  },
  {
    name: "Settings",
    Icon: Settings,
    link: "/sasettings",
  },
];

// Event Manager NavBar List
const navEventManagerList = [
  {
    name: "Events",
    Icon: UserCircle,
    link: "/events",
  },
  {
    name: "Statistics",
    Icon: BarChart3,
    link: "/emstatistics",
  },
  {
    name: "Settings",
    Icon: Settings,
    link: "/emsettings",
  },
];

function Navbar({ role }: { role: string }) {
  const [active, setActive] =
    role === "SUPERADMIN"
      ? useState<String>("/eventmanagers")
      : useState<String>("/events");
  const { logout } = useAuth();
  const navigate = useNavigate();
  function handleClick(clickedLink: string): void {
    setActive(clickedLink);
    navigate(clickedLink);
  }

  return (
    <nav className="w-3/12 h-screen flex flex-col fixed mt-14 pl-4 ">
      <ul className="links">
        {role === "SUPERADMIN" && (
          <>
            {navSuperAdminList.map((item, index) => {
              return (
                <li
                  className={`cursor-pointer mb-14 pl:8 lg:pl-16 ${
                    active === item.link ? "border-l-4 border-black font-bold lg:text-xl md:text-lg  sm:text-sm " : " font-light text-xl"
                  }`}
                  onClick={() => {
                    handleClick(item.link);
                  }}
                  key={index}
                >
                  <div className="flex">
                    <Label
                      className="m-auto center cursor-pointer "
                      style={{ marginLeft: "0.5rem" }}
                    >
                      {item.name}
                    </Label>
                  </div>
                </li>
              );
            })}
          </>
        )}
        {role === "EVENTMANAGER" && (
          <>
            {navEventManagerList.map((item, index) => {
              return (
                <li
                className={`cursor-pointer mb-14 pl:8 lg:pl-16 ${
                  active === item.link ? "border-l-4 border-black font-bold lg:text-xl md:text-lg  sm:text-sm " : " font-light text-xl"
                }`}
                onClick={() => {
                  handleClick(item.link);
                }}
                key={index}
              >
                <div className="flex">
                  <Label
                    className="m-auto center cursor-pointer "
                    style={{ marginLeft: "0.5rem" }}
                  >
                    {item.name}
                  </Label>
                </div>
              </li>
              );
            })}
          </>
        )}
      </ul>
      <div className="flex-1 flex justify-center items-center">
        <Button variant={"inverse"} className="w-1/2" onClick={() => {logout()}}>
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
