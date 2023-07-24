import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import "../../index.css"
import { useEffect, useState } from "react";
import TaskForm from "../../components/TaskForm";
import { useParams, useNavigate } from "react-router-dom";

const TaskItemPage = () => {
    const [task, setTask] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const getTask = async () => {
        const params = {
            method: 'GET',
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(`http://localhost/tasks/${id}`, params);
        if (response.status === 200) {
            const data = await response.json();
            if (data.status === 453) {
                return navigate("/login");
            }
            setTask(data.payload);
        } else {
            setTask({});
        }
    }
    useEffect(() => {
        getTask();
    }, [task, setTask]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen max-h-full"}>
                <NavHeader />
                <div className={"h-full mr-10 ml-10 mt-20"}>
                    <TaskForm />
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>)
}

export default TaskItemPage;