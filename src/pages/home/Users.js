import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import {Table} from "./Dashboard";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const params = {
                method: 'GET',
                headers: {
                    'access-token': localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch("http://localhost/users/1", params);
            if (response.status === 200) {
                const jsonData = await response.json();
                console.log(jsonData);
                setUsers(jsonData.payload.data);
            }else {
                setUsers([]);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleAddNewUser = (e) => {
        e.preventDefault();
        navigate("/dashboard/users/new")
    }
    useEffect(() => {
        getUsers();
    }, []);
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