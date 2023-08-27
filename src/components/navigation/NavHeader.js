import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../../assets/logo.png";
import { IoIosNotificationsOutline, IoIosSettings } from "react-icons/io";
import { IoLanguageOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const SearchComponent = () => {
    return (
        <div className={"flex items-center w-2/3"}>
            <div className={"flex w-2/3"}>
                <input type={"text"}
                    className={"block w-full px-4 py-2 text-purple-700 bg-white border rounded-l-2xl focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"}
                    placeholder={"Search..."}
                />
                <button className={"px-3 text-white bg-purple-600 rounded-r-2xl"}>
                    <AiOutlineSearch size={20} />
                </button>
            </div>
        </div>
    )
}

const logout = () => {
    localStorage.clear();
}

const list = [
    {
        name: "Account", link: "/dashboard/account", onClick: () => {
            console.log("Account Clicked");
        }
    },
    {
        name: "Notifications", link: "/dashboard/communications", onClick: () => {
            console.log("Notifications clicked");
        }
    },
    {
        name: "Logout", link: "/login", onClick: () => {
            logout();
        }
    },
]

const listMap = list.map((item, index) => {
    return (
        <div className={"p-2 hover:bg-purple-300 cursor-pointer"} onClick={item.onClick}>
            <Link to={item.link}><h3>{item.name}</h3></Link>
        </div>
    )
})

const ControlsComponent = () => {
    const [open, setIsOpen] = useState(false);
    return (
        <div className={"flex flex-row space-x-10 items-center"}>
            <div className={"flex flex-row gap-x-2"}>
                <Link to={"/dashboard/communications"}><IoIosNotificationsOutline size={25} /></Link>
                <Link to={"/dashboard/settings"}><IoIosSettings size={25} /></Link>
                <IoLanguageOutline size={25} />
            </div>
            <div className={"relative flex flex-col"}>
                <img className={"rounded-full border-2 border-gray-500 ml-20 h-10 w-10 text-white hover:bg-blue-800"}
                    src={logo}
                    alt={"profile_pic"} onClick={() => setIsOpen((prev) => !prev)} />
                {open && (
                    <div className={"bg-gray-400 absolute top-12 rounded-l rounded-r"}>
                        {listMap}
                    </div>
                )}
            </div>
        </div>
    )
}

const NavHeader = () => {
    return (
        <div className={"flex flex-row bg-white gap-x-8 mt-2 ml-10 mr-10 mb-2 justify-between"}>
            <SearchComponent />
            <ControlsComponent />
        </div>
    );
}

export default NavHeader;