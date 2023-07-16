import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import logo from "../../assets/logo.png";
import "../../index.css";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import React, {useState} from "react";
import DashCard from "../../components/DashCard";
import {PiUsersFour} from "react-icons/pi";
import {AiFillMessage, AiTwotoneHome} from "react-icons/ai";
import {BiMoney, BiUser} from "react-icons/bi";


export const Row = ({user}) => {
    console.log(user)
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={user.profileImage ? user.profileImage : logo}
                     alt="Jese"/>
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
            <td className="px-6 py-4">
                <Link to={`/dashboard/users/${user.email}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit
                    user</Link>
            </td>
        </tr>
    )
}

export const Table = ({data}) => {
    // console.log(data[0])
    return (
        <div className={"table"}>
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
                {data.map((userData,index) => {
                    return <Row user={userData}/>
                })}
                </tbody>
            </table>
        </div>
    );
}


const Dashboard = ({auth, ...rest}) => {

    const [houses, setHouses] = useState([]);
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [messages, setMessages] = useState([]);
    const [tenants, setTenants] = useState([]);
    const client = axios.create({baseURL: "http://localhost"})

    const getUsers = async () => {
        const response = await client.get('/users/1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('accessToken')
                }
            });
        // console.log(response.data);
        setUsers(response.data.payload.data);
    }

    const getHouses = async () => {
        const response = await client.get('/houses/1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('accessToken')
                }
            });
        setHouses(response.data.payload.data);
    }

    const getPayments = async () => {
        const response = await client.get('/payments/all/1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('accessToken')
                }
            });
        setPayments(response.data.payload.data);
    }

    const getMessages = async () => {
        const response = await client.get('/communications/1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('accessToken')
                },
            });
        setMessages(response.data.payload.data);
    }

    const getTenants = async () => {
        const response = await client.get('/tenants/1',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('accessToken')
                }
            });
        setTenants(response.data.payload.data);
    }

    useEffect(() => {
        getHouses();
        getUsers();
        getPayments();
        getMessages();
        getTenants();
    }, []);
    return (
        <div className={"flex max-h-full"}>
            <SideBar/>
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader/>
                <div className={"h-full flex flex-col w-full"}>
                    <div
                        className={"cards flex flex-row space-x-2 ml-10 mr-10 mt-10 h-56 rounded p-5 text-blue-700"}>
                        <DashCard icon={<PiUsersFour size={70}/>} name={"Tenants"} number={tenants.length}
                                  background={"bg-blue-300"}/>
                        <DashCard icon={<AiTwotoneHome size={70}/>} name={"Houses"} number={houses.length}
                                  background={"bg-blue-300"}/>
                        <DashCard icon={<BiMoney size={70}/>} name={"Payments"} number={payments.length}
                                  background={"bg-blue-300"}/>
                        <DashCard icon={<AiFillMessage size={70}/>} name={"Messages"} number={messages.length}
                                  background={"bg-blue-300"}/>
                        <DashCard icon={<BiUser size={70}/>} name={"Users"} number={users.length}
                                  background={"bg-blue-300"}/>
                    </div>
                    <hr className="h-px my-8 ml-10 mr-10 border-0 dark:bg-gray-700"/>
                    <div className={"stats flex flex-row pb-10 space-x-2 rounded ml-5"}>
                        <div className={"users flex flex-col rounded mt-3 w-2/4"}>
                            <h2 className={"bg-white text-xl ml-5 font-bold"}>Tenants</h2>
                            <Table data={users}/>
                        </div>
                        <div className={"houses flex flex-col mt-3 rounded w-2/4"}>
                            <h2 className={"bg-white text-xl ml-5 font-bold"}>Houses</h2>
                            <Table data={houses}/>
                        </div>
                    </div>
                </div>
                <div className={"align-baseline bg-gray-300"}>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;