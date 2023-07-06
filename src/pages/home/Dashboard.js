import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import logo from "../../assets/logo.png";
import "../../index.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import DashCard from "../../components/DashCard";
import { PiUsersFour } from "react-icons/pi";
import { AiFillMessage, AiTwotoneHome } from "react-icons/ai";
import { BiMoney, BiUser } from "react-icons/bi";


export const Table = () => {
    return (
        <div className={"table"}>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Position
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
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row"
                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-10 h-10 rounded-full" src={logo}
                                alt="Jese" />
                            <div className="pl-3">
                                <div className="text-base font-semibold">Neil Sims</div>
                                <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            React Developer
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                Online
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <Link to="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit
                                user</Link>
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row"
                            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-10 h-10 rounded-full" src={logo}
                                alt="Jese" />
                            <div className="pl-3">
                                <div className="text-base font-semibold">Bonnie Green</div>
                                <div className="font-normal text-gray-500">bonnie@flowbite.com</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            Designer
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                Online
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <Link to="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit
                                user</Link>
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row"
                            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-10 h-10 rounded-full" src={logo}
                                alt="Jese" />
                            <div className="pl-3">
                                <div className="text-base font-semibold">Jese Leos</div>
                                <div className="font-normal text-gray-500">jese@flowbite.com</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            Vue JS Developer
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                Online
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <Link to="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit
                                user</Link>
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row"
                            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-10 h-10 rounded-full" src={logo}
                                alt="Jese" />
                            <div className="pl-3">
                                <div className="text-base font-semibold">Thomas Lean</div>
                                <div className="font-normal text-gray-500">thomes@flowbite.com</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            UI/UX Engineer
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                Online
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <Link to="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit
                                user</Link>
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row"
                            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-10 h-10 rounded-full" src={logo}
                                alt="Jese" />
                            <div className="pl-3">
                                <div className="text-base font-semibold">Leslie Livingston</div>
                                <div className="font-normal text-gray-500">leslie@flowbite.com</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            SEO Specialist
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                Offline
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <Link to="/dashboard/users/userid"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit
                                user</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


const Dashboard = ({ auth, ...rest }) => {
    const [houses, setHouses] = useState([]);
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [messages, setMessages] = useState([]);
    const [tenants, setTenants] = useState([]);

    const getUsers = async () => {
        const response = await axios.get('/api/users', { headers: { 'Content-Type': 'application/json', 'accessToken': localStorage.getItem('accessToken') } });
        setUsers(response.data);
    }

    const getHouses = async () => {
        const response = await axios.get('/api/houses', { headers: { 'Content-Type': 'application/json', 'accessToken': localStorage.getItem('accessToken') } });
        setHouses(response.data);
    }

    const getPayments = async () => {
        const response = await axios.get('/api/payments', { headers: { 'Content-Type': 'application/json', 'accessToken': localStorage.getItem('accessToken') } });
        setPayments(response.data);
    }

    const getMessages = async () => {
        const response = await axios.get('/api/messages', { headers: { 'Content-Type': 'application/json', 'accessToken': localStorage.getItem('accessToken') } });
        setMessages(response.data);
    }

    const getTenants = async () => {
        const response = await axios.get('/api/tenants',
            { headers: { 'Content-Type': 'application/json', 'accessToken': localStorage.getItem('accessToken') } });
        setTenants(response.data);
    }

    useEffect(() => {
        // getHouses();
        // getUsers();
        // getPayments();
        // getMessages();
        // getTenants();
    }, [houses, setHouses, users, setUsers, payments, setPayments, messages, setMessages, tenants, setTenants]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full"}>
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
                            <Table data={houses} />
                        </div>
                        <div className={"houses flex flex-col mt-3 rounded w-2/4"}>
                            <h2 className={"bg-white text-xl ml-5 font-bold"}>Houses</h2>
                            <Table data={houses} />
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