import { BarChart3, CalendarDays, Settings, UserCircle, Users } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const navSuperAdminList = [
    {
        name: "Event Manager",
        Icon: UserCircle,
        link: "/eventmanagers"
    },
    {
        name: "Event Manager",
        Icon: UserCircle,
        link: "/eventmanagers"
    },
    {
        name: "Event Manager",
        Icon: UserCircle,
        link: "/eventmanagers"
    },
    {
        name: "Event Manager",
        Icon: UserCircle,
        link: "/eventmanagers"
    },
]

function Navbar(
    { role }: { role: string }
) {
    const [active, setActive] = useState<String>("eventManager");
    const navigate = useNavigate()
    function handleClick(clickedLink: string): void {
        setActive(clickedLink);
        navigate("/sastatistics")
    }

    return (
        <nav className="w-3/12 shadow-[1px_0px_7px_rgba(0,0,0,0.25)]">
            <div className='w-full h-1/5 flex justify-center align-center' >
                <img src="/logo.svg" alt="Eventy logo" className='w-32' style={{ objectFit: 'contain' }} />
            </div>
            <div className='flex items-center mb-3'>
                <div className='h-0.5 w-10 bg-black'></div>
                <p className='px-2 font-semibold'>Navigation</p>
                <div className='h-0.5 w-full bg-black'></div>
            </div>
            <ul className='links'>
                {role === 'SUPERADMIN' && (
                    <>
                    <li className={`cursor-pointer p-1 pl-5 ${active === "eventManager" ? "bg-primary text-white" : ""}`} onClick={() => { handleClick("eventManager") }}>
                        <div className="flex">
                            <Users className='m-4' />
                            <Label className='m-auto center font-bold cursor-pointer ' style={{ marginLeft: '0.5rem' }}>Event Managers</Label>
                        </div>
                    </li>
                    <li className={`cursor-pointer p-1 pl-5 ${active === "statistics" ? "bg-primary text-white" : ""}`} onClick={() => { handleClick("statistics") }}>
                        <div className="flex">
                            <BarChart3 className='m-4' />
                            <Label className='m-auto center font-bold cursor-pointer' style={{ marginLeft: '0.5rem' }}>Statistics</Label>
                        </div>
                    </li>
                    <li className={`cursor-pointer p-1 pl-5 ${active === "settings" ? "bg-primary text-white" : ""}`} onClick={() => { handleClick("settings") }}>
                        <div className="flex">
                            <Settings className='m-4' />
                            <Label className='m-auto center font-bold cursor-pointer ' style={{ marginLeft: '0.5rem' }}>Settings</Label>
                        </div>
                    </li>
                </>
                )}
                {role === 'EVENTMANAGER' && (
                    <>
                        <li className={`cursor-pointer p-1 pl-5 ${active === "profile" ? "bg-primary text-white" : ""}`} onClick={() => { handleClick("profile") }}>
                            <div className="flex">
                                <UserCircle className='m-4' />
                                <Label className='m-auto center font-bold cursor-pointer ' style={{ marginLeft: '0.5rem' }}>Profile</Label>
                            </div>
                        </li>
                        <li className={`cursor-pointer p-1 pl-5 ${active === "events" ? "bg-primary text-white" : ""}`} onClick={() => { handleClick("events") }}>
                            <div className="flex">
                                <CalendarDays className='m-4' />
                                <Label className='m-auto center font-bold cursor-pointer ' style={{ marginLeft: '0.5rem' }}>Events</Label>
                            </div>
                        </li>
                        <li className={`cursor-pointer p-1 pl-5 ${active === "statistics" ? "bg-primary text-white" : ""}`} onClick={() => { handleClick("statistics") }}>
                            <div className="flex">
                                <BarChart3 className='m-4' />
                                <Label className='m-auto center font-bold cursor-pointer' style={{ marginLeft: '0.5rem' }}>Statistics</Label>
                            </div>
                        </li>
                        <li className={`cursor-pointer p-1 pl-5 ${active === "settings" ? "bg-primary text-white" : ""}`} onClick={() => { handleClick("settings") }}>
                            <div className="flex">
                                <Settings className='m-4' />
                                <Label className='m-auto center font-bold cursor-pointer ' style={{ marginLeft: '0.5rem' }}>Settings</Label>
                            </div>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;