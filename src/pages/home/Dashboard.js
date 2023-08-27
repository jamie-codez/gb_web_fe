import SideBar from "../../components/navigation/SideBar";
import NavHeader from "../../components/navigation/NavHeader";
import Footer from "../../components/navigation/Footer";
import "../../index.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashCard from "../../components/dashboard/DashCard";
import { PiUsersFour } from "react-icons/pi";
import { AiFillMessage, AiTwotoneHome } from "react-icons/ai";
import { BiMoney, BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import UserTable from "../../components/user/UserTable";
import HouseTable from "../../components/house/HouseTable";


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
        if (response.status === 200) {
            if (response.data.code === 453) {
                localStorage.clear();
                window.location.href = "/login"
            } else if (response.data.code === 200) {
                if (!response.data.payload.data) {
                    setUsers([]);
                } else {
                    setUsers(response.data.payload.data);
                }
            } else {
                console.log(response.data.message);
            }
        } else {
            setUsers([])
        }
    }

    const getHouses = async () => {
        const response = await client.get('/houses/1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('accessToken')
                }
            });
        console.log(response.status)
        if (response.status === 200) {
            console.log(response.data)
            if (response.data.code === 453) {
                localStorage.clear();
                window.location.href = "/login"
            } else if (response.data.code === 200) {
                if (!response.data.payload.data) {
                    setHouses([]);
                } else {
                    setHouses(response.data.payload.data);
                }
            } else {
                console.log(response.data.message);
            }
        } else {
            setHouses([])
        }
    }

    const getPayments = async () => {
        const response = await client.get('/payments/1',
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
            } else if (response.data.code === 200) {
                if (!response.data.payload.data) {
                    setPayments([]);
                } else {
                    setPayments(response.data.payload.data);
                }
            } else {
                console.log(response.data.message);
            }
        } else {
            setPayments([])
        }


    }

    const getMessages = async () => {
        const response = await client.get('/communications/1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('accessToken')
                },
            });
        if (response.status === 200) {
            if (response.data.code === 453) {
                localStorage.clear();
                window.location.href = "/login"
            } else if (response.data.code === 200) {
                if (!response.data.payload.data) {
                    setMessages([]);
                } else {
                    setMessages(response.data.payload.data);
                }
            } else {
                console.log(response.data.message);
            }
        } else {
            setMessages([])
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
            } else if (response.data.code === 200) {
                if (!response.data.payload.data) {
                    setTenants([]);
                } else {
                    setTenants(response.data.payload.data);
                }
            } else {
                setTenants([]);
                console.log(response.data.message);
            }
        } else {
            setTenants([]);
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
            } else if (response.data.code === 200) {
                await swal("Success", response.data.message, "success", {
                    buttons: false,
                    timer: 2000
                }).then(() => {
                    getHouses().then(result => console.log(result));
                });

            } else {
                await swal("Error", response.data.message, "error", {
                    buttons: false,
                    timer: 2000
                }).then(() => {
                    console.log(response.data.message);
                });
            }
        } else {
            await swal("Error", "Error deleting house", "error", {
                buttons: false,
                timer: 2000
            }).then(() => {
                console.log("Error deleting house");
            });
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
            } else if (response.data.code === 200) {
                getPayments().then(result => console.log(result));
                swal("Success", response.data.message, "success", {
                    buttons: false,
                    timer: 2000
                });
            } else {
                swal("Error", response.data.message, "error", {
                    buttons: false,
                    timer: 2000
                });
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
            if (response.data.code === 453) {
                localStorage.clear();
                window.location.href = "/login"
            } else if (response.data.code === 200) {
                getMessages().then(result => console.log(result));
                alert(response.data.message);
            } else {
                swal("Error", response.data.message, "error", {
                    buttons: false,
                    timer: 2000
                });
            }
        } else {
            swal("Error", "Error deleting message", "error", {
                buttons: false,
                timer: 2000
            });
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
            } else if (response.data.code === 200) {
                getUsers().then(result => console.log(result));
                alert(response.data.message);
            } else {
                console.log(response.data.message);
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
        getHouses().then(() => console.log("getHouses promise resolved"));
        getUsers().then(() => console.log("getUsers promise resolved"));
        getPayments().then(() => console.log("getPayments promise resolved"));
        getMessages().then(() => console.log("getMessages promise resolved"));
        getTenants().then(() => console.log("getTenants promise resolved"));
    }, []);

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
                            <h2 className={"bg-white text-xl ml-5 font-bold"}>Users</h2>
                            <UserTable data={users} editCallback={editUser} deleteCallback={deleteUser} />
                        </div>
                        <div className={"houses flex flex-col mt-3 rounded w-2/4"}>
                            <h2 className={"bg-white text-xl ml-5 font-bold"}>Houses</h2>
                            <HouseTable data={houses} editCallback={editHouse} deleteCallback={deleteHouse} />
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