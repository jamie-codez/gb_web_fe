import SideBar from "../../components/navigation/SideBar";
import NavHeader from "../../components/navigation/NavHeader";
import Footer from "../../components/navigation/Footer";
import Table from "../../components/general/Table";
import { useEffect, useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const getUsers = useCallback(async () => {
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
                if (jsonData.code === 200) {
                    setUsers(jsonData.payload.data);
                } else if (jsonData.code === 453) {
                    localStorage.clear();
                    window.location.href = "/login"
                } else {
                    setUsers([]);
                }

            } else {
                setUsers([]);
            }
        } catch (e) {
            console.log(e);
        }
    },[setUsers])

    const deleteUser = async (id) => {
        const params = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'access-token': localStorage.getItem('accessToken')
            }
        }
        const response = await fetch(`http://localhost/users/${id}`, params);
        if (response.status === 200) {
            const data = await response.json();
            if (data.code === 200) {
                getUsers().then(response => console.log(response));
            } else if (data.code === 453) {
                localStorage.clear();
                window.location.href = "/login";
            } else {
                alert(data.message);
            }

        } else {
            alert("Error deleting user");
        }
    }

    const editUser = (id) => {
        navigate(`/dashboard/users/${id}`);
    }

    const handleAddNewUser = (e) => {
        e.preventDefault();
        navigate("/dashboard/users/new")
    }
    useEffect(() => {
        getUsers().then(() => console.log("getUser promise resolved"));
    }, [users,getUsers,setUsers]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader />
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col w-full mt-10"}>
                        <div className={"flex flex-row mt-5 justify-end mr-20"} onClick={handleAddNewUser}>
                            <button className={"bg-purple-700 p-2 rounded-lg text-white mb-5"}>Add New User
                            </button>
                        </div>
                        <Table data={users} editCallback={editUser} deleteCallback={deleteUser} />
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