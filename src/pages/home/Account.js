import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import UserForm from "../../components/UserForm";
import "../../index.css"
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

const Account = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const authenticated = localStorage.getItem("authenticated");
        if (authenticated) {
            setIsAuthenticated(true);
        }
    }, [isAuthenticated]);
    return (
        <div>
            {isAuthenticated ? <div className={"flex"}>
                <SideBar/>
                <div className={"flex flex-col w-full h-screen max-h-full"}>
                    <NavHeader/>
                    <div className={"h-full mr-10 ml-10 mt-20"}>
                        <UserForm/>
                    </div>
                    <div className={"align-baseline"}>
                        <Footer/>
                    </div>
                </div>
            </div> : <Navigate to={"/login"} replace={true}/>}
        </div>
    )
}

export default Account;