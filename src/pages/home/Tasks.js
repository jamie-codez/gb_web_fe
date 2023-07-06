import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import {Table} from "./Dashboard";
import {useEffect, useState} from "react";

const Tasks = () => {
    const [tasks,setTasks] = useState([]);
    const getTasks = async () => {
        const response = await fetch("http://localhost:5000/tasks");
        const data = await response.json();
        setTasks(data);
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
                        <Table/>
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