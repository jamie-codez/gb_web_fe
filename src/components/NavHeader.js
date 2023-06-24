import React from "react";
import {AiOutlineSearch} from "react-icons/ai";
import logo from "../assets/logo.png";
import {IoIosNotificationsOutline, IoIosSettings} from "react-icons/io";
import {IoLanguageOutline} from "react-icons/io5";

const SearchComponent = () => {
    return (
        <div className={"flex items-center w-2/3"}>
            <div className={"flex w-2/3"}>
                <input type={"text"}
                       className={"block w-full px-4 py-2 text-purple-700 bg-white border rounded-l-2xl focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"}
                       placeholder={"Search..."}
                />
                <button className={"px-3 text-white bg-purple-600 rounded-r-2xl"}>
                    <AiOutlineSearch size={20}/>
                </button>
            </div>
        </div>
    )
}

const ControlsComponent = () => {
    return (
        <div className={"flex flex-row space-x-10 items-center"}>
            <div className={"flex flex-row gap-x-2"}>
                <IoIosNotificationsOutline size={25}/>
                <IoIosSettings size={25}/>
                <IoLanguageOutline size={25}/>
            </div>
            <div className={"rounded-full border-2 border-gray-500 ml-20"}>
                <img className={"h-10 w-10"} src={logo} alt={"profile_pic"}/>
            </div>
        </div>
    )
}

const NavHeader = () => {
    return (
        <div className={"flex flex-row bg-white gap-x-8 mt-2 ml-10 mr-10 mb-2 justify-between"}>
            <SearchComponent/>
            <ControlsComponent/>
        </div>
    );
}

export default NavHeader;