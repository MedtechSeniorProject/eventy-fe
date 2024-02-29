import { BarChart3, CalendarDays, Settings, UserCircle, Users } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// superAdmin NavBar List
const navSuperAdminList = [
    {
        name: "Event Managers",
        Icon: UserCircle,
        link: "/eventmanagers"
    },
    {
        name: "Statistics",
        Icon: BarChart3,
        link: "/sastatistics"
    },
    {
        name: "Settings",
        Icon: Settings,
        link: "/sasettings"
    },
]

// Event Manager NavBar List
const navEventManagerList = [
    {
        name: "Events",
        Icon: UserCircle,
        link: "/events"
    },
    {
        name: "Statistics",
        Icon: BarChart3,
        link: "/emstatistics"
    },
    {
        name: "Settings",
        Icon: Settings,
        link: "/emsettings"
    },
]
function Navbar(
    { role }: { role: string }
) {
    const [active, setActive] = role === 'SUPERADMIN' ? useState<String>("/eventmanagers"): useState<String>("/events");
    const navigate = useNavigate()
    function handleClick(clickedLink: string): void {
        setActive(clickedLink);
        navigate(clickedLink)
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
                    {navSuperAdminList.map((item, index) => {
                        return (
                            <li className={`cursor-pointer p-1 pl-5 ${active === item.link ? "bg-primary text-white" : ""}`} onClick={() => { handleClick(item.link) }} key={index}>
                                <div className="flex">
                                    <item.Icon className='m-4' />
                                    <Label className='m-auto center font-bold cursor-pointer ' style={{ marginLeft: '0.5rem' }}>{item.name}</Label>
                                </div>
                            </li>
                        )
                    })}
                </>
                )}
                {role === 'EVENTMANAGER' && (
                <>
                 {navEventManagerList.map((item, index) => {
                        return (
                            <li className={`cursor-pointer p-1 pl-5 ${active === item.link ? "bg-primary text-white" : ""}`} onClick={() => { handleClick(item.link) }} key={index}>
                                <div className="flex">
                                    <item.Icon className='m-4' />
                                    <Label className='m-auto center font-bold cursor-pointer ' style={{ marginLeft: '0.5rem' }}>{item.name}</Label>
                                </div>
                            </li>
                         )
                    })}   
                    </>
                    )}
            </ul>
        </nav>
    )
}

export default Navbar;