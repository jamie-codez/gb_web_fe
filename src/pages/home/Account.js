import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import UserForm from "../../components/UserForm";
import "../../index.css"
import { useEffect, useState } from "react";
import Login from "../Login";
import axios from "axios";

const Account = () => {
    const [user, setUsers] = useState({});
    const getUser = async () => {
        const response = await axios.get("/api/user");
        setUsers(response.data);
    }
    useEffect(() => {
        getUser();
    }, [user, setUsers]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen max-h-full"}>
                <NavHeader />
                <div className={"h-full mr-10 ml-10 mt-20"}>
                    <UserForm />
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>)
}

export default Account;