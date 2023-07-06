import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import { Table } from "./Dashboard";
import { useState, useEffect } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        const response = await fetch("http://localhost:5000/users",
            { headers: { 'Content-Type': 'application/json', 'accessToken': localStorage.getItem('accessToken') } });
        const data = await response.json();
        setUsers(data);
    }
    useEffect(() => {
        getUsers();
    }, [users, setUsers]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader />
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col w-full mt-10"}>
                        <Table data={users}/>
                    </div>
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Users;