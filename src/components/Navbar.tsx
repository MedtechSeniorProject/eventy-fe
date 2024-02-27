import { BarChart3, Settings, UserCircle, Users } from 'lucide-react';
import Logo from '../assets/logo.png';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';

function Navbar(
    { role }: { role: string }
) {
    const [active, setActive] = useState<String>("profile");

    function handleClick(clickedLink: string): void {
        setActive(clickedLink);
        //TODO: Add logic to navigate to the clicked link
    }

    return (
        <nav className="w-3/12 shadow-[1px_0px_7px_rgba(0,0,0,0.25)]">
            <div className='w-full h-1/5 flex justify-center align-center p-[22%]' >
                <img src={Logo} alt="Eventy logo" className='center' style={{ objectFit: 'contain' }} />
            </div>
            <ul className='links'>

                {role === 'SUPERADMIN' && (
                    <li>
                        <a href='/superadmin'>Superadmin</a>
                    </li>
                )}
                {role === 'EVENTMANAGER' && (
                    <>
                        <li className={`cursor-pointer p-1 pl-5 ${active === "profile" ? "bg-primary text-white" : ""}`} onClick={() => { handleClick("profile") }}>
                            <div className="flex">
                                <UserCircle className='m-4' />
                                <Label className='m-auto center font-bold cursor-pointer ' style={{ marginLeft: '0.5rem' }}>Profile</Label>
                            </div>
                        </li>
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
            </ul>

        </nav>
    )
}

export default Navbar;