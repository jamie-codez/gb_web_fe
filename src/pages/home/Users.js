import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import {Table} from "./Dashboard";
import {useState, useEffect} from "react";
import axios from "axios";
import {Link, Navigate, useNavigate} from "react-router-dom";

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const client = axios.create({baseURL: "http://localhost"})

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getUsers = async () => {
        const response = await client.get("/users/1", {
            headers: {
                "content-type": "application/json",
                "access-token": localStorage.getItem("accessToken")
            }
        });
        const data = await response.data;
        console.log(data.payload)
        setUsers(data.payload.data);
    }
    const handleAddNewUser = (e) => {
        e.preventDefault();
        navigate("/dashboard/users/new")
    }
    useEffect(() => {
        getUsers().then(r => console.log(r));
    }, [users, setUsers]);
    return (
        <div className={"flex"}>
            <SideBar/>
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader/>
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col w-full mt-10"}>
                        <div className={"flex flex-row mt-5 justify-end mr-20"} onClick={handleAddNewUser}>
                            <button className={"bg-purple-700 p-2 rounded-lg text-white mb-5"}>Add New User
                            </button>
                        </div>
                        <Table data={users}/>
                    </div>
                </div>
                <div className={"align-baseline"}>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Users;