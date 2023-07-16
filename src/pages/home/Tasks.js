import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import {Table} from "./Dashboard";
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Tasks = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const client = axios.create({baseURL: "http://localhost"})
    const getTasks = async () => {
        const params = {
            method: 'GET',
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        }
        const response = await fetch("http://localhost/tasks/1", params);
        if (response.status === 200) {
            const data = await response.json();
            setTasks(data.payload.data);
        } else {
            setTasks([]);
        }
    }
    const handleAddNewTaskClick = () => {
        navigate("/dashboard/tasks/new");
    }

    useEffect(() => {
        getTasks();
    }, [tasks, setTasks]);
    return (
        <div className={"flex"}>
            <SideBar/>
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader/>
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col w-full mt-10"}>
                        <div className={"flex flex-row mt-5 justify-end mr-20"}>
                            <button className={"bg-purple-700 p-2 rounded-lg text-white mb-5"}
                                    onClick={handleAddNewTaskClick}>Add New Task
                            </button>
                        </div>
                        <Table data={tasks}/>
                    </div>
                </div>
                <div className={"align-baseline"}>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Tasks;