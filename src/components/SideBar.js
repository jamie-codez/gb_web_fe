import React from "react";
import {IoIosArrowBack} from "react-icons/io";
import {FiUser} from "react-icons/fi";
import {BsHouses} from "react-icons/bs";
import {RxDashboard} from "react-icons/rx";
import {PiUsersFour} from "react-icons/pi";
import {MdOutlinePayments} from "react-icons/md";
import {BiMessageDetail} from "react-icons/bi";
import {BiTask} from "react-icons/bi";
import {SiSoundcharts} from "react-icons/si";
import {MdOutlineAccountCircle} from "react-icons/md";
import logo from "../assets/logo.png";
import {useState} from "react";
import {Link} from "react-router-dom";

const SideBar = () => {
    const [open, setOpen] = useState(true);
    const menuItems = [
        {title: "Dashboard", link: "/dashboard", icon: <RxDashboard size={20}/>},
        {title: "Users", link: "/dashboard/users", icon: <FiUser size={20}/>, gap: true},
        {title: "Houses", link: "/dashboard/houses", icon: <BsHouses size={20}/>},
        {title: "Tenants", link: "/dashboard/tenants", icon: <PiUsersFour size={25}/>},
        {title: "Payments", link: "/dashboard/payments", icon: <MdOutlinePayments size={20}/>},
        {title: "Communications", link: "/dashboard/communications", icon: <BiMessageDetail size={20}/>},
        {title: "Tasks", link: "/dashboard/tasks", icon: <BiTask size={20}/>, gap: true},
        {title: "Analytics", link: "/dashboard/analytics", icon: <SiSoundcharts size={20}/>},
        {title: "Account", link: "/dashboard/account", icon: <MdOutlineAccountCircle size={20}/>},
    ]

    const listItem = menuItems.map((menuItem, index) => {
        return <Link to={menuItem.link}>
            <li key={index}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menuItem.gap ? "mt-9" : "mt-2"}`}>
                {menuItem.icon}
                <span className={`${!open && 'hidden'} origin-left duration-300`}>{menuItem.title}</span>
            </li>
        </Link>
    })
    return (
        <div className={`${open ? " w-72" : "w-20"} duration-300 max-h-full p-5 pt-8 bg-dark-purple relative`}>
            <IoIosArrowBack
                className={`absolute cursor-pointer bg-white rounded-full ${!open && "rotate-180"} -right-3 top-9 w-7 items-center justify-center pr-0.5 h-7 border-2 border-dark-purple`}
                onClick={() => setOpen(!open)}/>
            <div className={"flex gap-x-4 items-center"}>
                <img src={logo} alt={"logo"} className={`w-8 cursor-pointer duration-500`}/>
                <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}>Green
                    Bay</h1>
            </div>
            <ul className={"pt-6"}>
                {listItem}
            </ul>
        </div>
    )
}

export default SideBar;