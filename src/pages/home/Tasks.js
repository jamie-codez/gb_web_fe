import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import {Table} from "./Dashboard";
import axios from "axios";
import {useEffect, useState} from "react";

const Tasks = () => {
    const [tasks,setTasks] = useState([]);
    const getTasks = async () => {
    const response = await axios.get("/api/tasks");
        setTasks(response.data.tasks);
    }

    useEffect(() => {
       getTasks();
    }, [tasks,setTasks]);
    return (
        <div className={"flex"}>
            <SideBar/>
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader/>
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col w-full mt-10"}>
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