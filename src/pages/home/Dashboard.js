import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import logo from "../../assets/logo.png";
import "../../index.css";
import { useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";
import DashCard from "../../components/DashCard";
import { PiUsersFour } from "react-icons/pi";
import { AiFillMessage, AiOutlineDelete, AiOutlineEdit, AiTwotoneHome } from "react-icons/ai";
import { BiMoney, BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


export const Row = ({ user, editCallback, deleteCallback }) => {
    const handleDeleteCallback = (e) => {
        e.preventDefault();
        deleteCallback(user._id);
    }


    const handleEditCallback = (e) => {
        e.preventDefault();
        editCallback(user._id);
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={user.profileImage ? user.profileImage : logo}
                    alt="Profile" />
                <div className="pl-3">
                    <div className="text-base font-semibold">{user.username}</div>
                    <div className="font-normal text-gray-500">{user.email}</div>
                </div>
            </th>
            <td className="px-6 py-4">
                {user.phone}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    {user.verified ? <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> :
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>}
                    Verified
                </div>
            </td>
            <td className="px-6 py-4 flex flex-row items-center justify-center mb-5">
                <AiOutlineEdit className={"text-blue-500 cursor-pointer w-5 h-5"} onClick={handleEditCallback} />
                <AiOutlineDelete className={"ml-5 text-red-500 cursor-pointer w-5 h-5"} onClick={handleDeleteCallback} />
            </td>
        </tr>
    )
}

export const Table = ({ data, editCallback, deleteCallback }) => {
    return (
        <div>
            {
                data.length === 0 ? <div className={"flex flex-col justify-center items-center"}>
                    <h2 className={"text-xl font-bold mt-20"}>No data available</h2>
                </div> : <div className={"table"}>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((userData, index) => {
                                return <Row user={userData} editCallback={editCallback} deleteCallback={deleteCallback} />
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}


const Dashboard = ({ auth, ...rest }) => {
    const navigate = useNavigate();
    const [houses, setHouses] = useState([]);
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [messages, setMessages] = useState([]);
    const [tenants, setTenants] = useState([]);
    const client = axios.create({ baseURL: "http://localhost" })

    const getUsers = async () => {
        console.log(users)
        const response = await client.get('/users/1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('accessToken')
                }
            });
            response.status===200?
        setUsers(response.data.payload.data):setUsers([]);
    }

    const getHouses = async () => {
        const response = await client.get('/houses/1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('accessToken')
                }
            });
            response.status===200?
        setHouses(response.data.payload.data):setHouses([]);
    }

    const getPayments = async () => {
        const response = await client.get('/payments/all/1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('accessToken')
                }
            });
        if (response.data.code === 453) {
            localStorage.clear();
            window.location.href = "/login"
        } else{
            response.status===200?
            setPayments(response.data.payload.data):setPayments([]);}
    }

    const getMessages = async () => {
        const response = await client.get('/communications/1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('accessToken')
                },
            });
        if (response.data.code === 453) {
            localStorage.clear();
            window.location.href = "/login"
        } else {
            response.status===200?
            setMessages(response.data.payload.data):setMessages([]);
        }
    }

    const getTenants = async () => {
        const response = await client.get('/tenants/1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('accessToken')
                }
            });
        if (response.status === 200) {
            if (response.data.code === 453) {
                localStorage.clear();
                window.location.href = "/login"
            } else {
                response.status===200?
                setTenants(response.data.payload.data):setTenants([]);
            }
        }
    }

    const editHouse = (id) => {
        navigate(`/dashboard/houses/${id}`);
    }

    const deleteHouse = async (id) => {
        const params = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'access-token': localStorage.getItem('accessToken')
            }
        }
        const response = await fetch(`http://localhost/houses/${id}`, params);
        const data = await response.json();
        if (data.status === 200) {
            if (response.data.code === 453) {
                localStorage.clear();
                window.location.href = "/login"
            } else {
                getHouses();
            }
        } else {
            alert("Error deleting house");
        }
    }

    const deletePayment = async (id) => {
        const params = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'access-token': localStorage.getItem('accessToken')
            }
        }
        const response = await fetch(`http://localhost/payments/${id}`, params);
        const data = await response.json();
        if (data.status === 200) {
            if (response.data.code === 453) {
                localStorage.clear();
                window.location.href = "/login"
            } else {
                getPayments();
            }
        } else {
            alert("Error deleting payment");
        }
    }

    const deleteMessage = async (id) => {
        const params = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'access-token': localStorage.getItem('accessToken')
            }
        }
        const response = await fetch(`http://localhost/communications/${id}`, params);
        const data = await response.json();
        if (data.status === 200) {
            getMessages();
        } else {
            alert("Error deleting message");
        }
    }


    const deleteUser = async (id) => {
        const params = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'access-token': localStorage.getItem('accessToken')
            }
        }
        const response = await fetch(`http://localhost/users/${id}`, params);
        const data = await response.json();
        if (data.status === 200) {
            if (response.data.code === 453) {
                localStorage.clear();
                window.location.href = "/login"
            } else {
                getUsers();
            }
        } else {
            alert("Error deleting user");
        }
    }

    const editUser = (id) => {
        console.log(id)
        return navigate(`/dashboard/users/${id}`);
    }

    useEffect(() => {
        getHouses();
        getUsers();
        getPayments();
        getMessages();
        getTenants();
    });

    return (
        <div className={"flex max-h-full"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader />
                <div className={"h-full flex flex-col w-full"}>
                    <div
                        className={"cards flex flex-row space-x-2 ml-10 mr-10 mt-10 h-56 rounded p-5 text-blue-700"}>
                        <DashCard icon={<PiUsersFour size={70} />} name={"Tenants"} number={tenants.length}
                            background={"bg-blue-300"} />
                        <DashCard icon={<AiTwotoneHome size={70} />} name={"Houses"} number={houses.length}
                            background={"bg-blue-300"} />
                        <DashCard icon={<BiMoney size={70} />} name={"Payments"} number={payments.length}
                            background={"bg-blue-300"} />
                        <DashCard icon={<AiFillMessage size={70} />} name={"Messages"} number={messages.length}
                            background={"bg-blue-300"} />
                        <DashCard icon={<BiUser size={70} />} name={"Users"} number={users.length}
                            background={"bg-blue-300"} />
                    </div>
                    <hr className="h-px my-8 ml-10 mr-10 border-0 dark:bg-gray-700" />
                    <div className={"stats flex flex-row pb-10 space-x-2 rounded ml-5"}>
                        <div className={"users flex flex-col rounded mt-3 w-2/4"}>
                            <h2 className={"bg-white text-xl ml-5 font-bold"}>Tenants</h2>
                            <Table data={users} editCallback={editUser} deleteCallback={deleteUser} />
                        </div>
                        <div className={"houses flex flex-col mt-3 rounded w-2/4"}>
                            <h2 className={"bg-white text-xl ml-5 font-bold"}>Houses</h2>
                            <Table data={houses} editCallback={editHouse} deleteCallback={deleteHouse} />
                        </div>
                    </div>
                </div>
                <div className={"align-baseline bg-gray-300"}>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;