import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import "../../index.css"
import {useEffect, useState} from "react";
import axios from "axios";
import CommunicationForm from "../../components/CommunicationForm";
import TaskForm from "../../components/TaskForm";

const TaskItemPage = () => {
    const [user, setUsers] = useState({});
    const client = axios.create({baseURL:"http://localhost"})
    const getUser = async () => {
        const response = await client.get("/users/1");
        const data = response.data
        setUsers(data.payload.data);
    }
    useEffect(() => {
        getUser();
    }, [user, setUsers]);
    return (
        <div className={"flex"}>
            <SideBar/>
            <div className={"flex flex-col w-full h-screen max-h-full"}>
                <NavHeader/>
                <div className={"h-full mr-10 ml-10 mt-20"}>
                    <TaskForm/>
                </div>
                <div className={"align-baseline"}>
                    <Footer/>
                </div>
            </div>
        </div>)
}

export default TaskItemPage;