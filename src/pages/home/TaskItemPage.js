import SideBar from "../../components/navigation/SideBar";
import NavHeader from "../../components/navigation/NavHeader";
import Footer from "../../components/navigation/Footer";
import "../../index.css"
import {useEffect, useState,useCallback} from "react";
import TaskForm from "../../components/task/TaskForm";
import {useNavigate, useParams} from "react-router-dom";

const TaskItemPage = () => {
    const [task, setTask] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const getTask = useCallback(async () => {
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
    },[id, navigate])
    useEffect(() => {
        getTask().then(() => console.log("getTask promise resolved"));
    }, [task, setTask, getTask]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen max-h-full"}>
                <NavHeader />
                <div className={"h-full mr-10 ml-10 mt-20"}>
                    <TaskForm />
                </div>
                <div className="fixed bottom-0 left-0 z-20 w-full">
                    <Footer />
                </div>
            </div>
        </div>)
}

export default TaskItemPage;