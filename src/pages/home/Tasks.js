import SideBar from "../../components/navigation/SideBar";
import NavHeader from "../../components/navigation/NavHeader";
import Footer from "../../components/navigation/Footer";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import TaskTable from "../../components/task/TaskTable";

const Tasks = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const getTasks = useCallback(async () => {
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
            if (data.code === 453) {
                localStorage.clear();
                window.location.href = "/login"
            } else if (data.code === 200) {
                setTasks(data.payload.data);
            } else {
                setTasks([]);
                swal("Error", data.message, "error");
            }
        } else {
            setTasks([]);
        }
    }, [setTasks])

    const handleAddNewTaskClick = () => {
        navigate("/dashboard/tasks/new");
    }

    const handleEditCallback = (id) => {
        navigate(`/dashboard/tasks/${id}`);
    }

    const handleDeleteCallback = async (id) => {
        const params = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "access-token": localStorage.getItem("accessToken"),
            }
        }
        const response = await fetch(`http://localhost/tasks/${id}`, params)
        if (response.status === 200) {
            const data = await response.json();
            if (data.code === 200) {
                getTasks().then(response => console.log(response));
            } else if (data.code === 453) {
                localStorage.clear();
                window.location.href = "/login";
            } else {
                alert(data.message);
            }

        } else {
            swal("Error", "Something went wrong", "error");
        }
    }

    useEffect(() => {
        getTasks().then(() => console.log("getTasks promise resolved"));
    }, [tasks, getTasks, setTasks]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader />
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col w-full mt-10"}>
                        <div className={"flex flex-row mt-5 justify-end mr-20"}>
                            <button className={"bg-purple-700 p-2 rounded-lg text-white mb-5"}
                                onClick={handleAddNewTaskClick}>Add New Task
                            </button>
                        </div>
                        <TaskTable data={tasks} editCallback={handleEditCallback} deleteCallback={handleDeleteCallback} />
                    </div>
                </div>
                <div className="fixed bottom-0 left-0 z-20 w-full">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Tasks;