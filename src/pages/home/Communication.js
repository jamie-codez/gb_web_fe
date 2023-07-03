import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import {Table} from "./Dashboard";
import {useEffect, useState} from "react";
import Login from "../Login";

const Communications = () => {
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
                <div className={"flex flex-col w-full h-screen"}>
                    <NavHeader/>
                    <div className={"h-full w-full"}>
                        <div className={"flex flex-col mt-10"}>
                            <Table/>
                        </div>
                    </div>
                    <div className={"align-baseline"}>
                        <Footer/>
                    </div>
                </div>
            </div> : <Login/>}
        </div>
    )
}

export default Communications;