import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import "../../index.css"
import {useEffect, useState} from "react";
import Login from "../Login";

const Settings = () => {
    return (
        <div className={"flex"}>
            <SideBar/>
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader/>
                <div className={"h-full w-full"}>
                    <div className={"center items-center h-full font-bold text-3xl"}>
                        <h1>We are working on something great!! </h1>
                        <h1>Thank you for being patient🙂</h1>
                    </div>
                </div>
                <div className={"align-baseline bg-gray-300"}>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Settings;