import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import "../../index.css"
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

const Settings = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const authenticated = localStorage.getItem("authenticated");
        if (authenticated) {
            setIsAuthenticated(true);
        }
    }, [isAuthenticated]);
    return (
        <div>
            {isAuthenticated ?
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
                </div> : <Navigate to={"/login"} replace={true}/>
            }
        </div>
    )
}

export default Settings;