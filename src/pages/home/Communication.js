import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import {Table} from "./Dashboard";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Communications = () => {
    const navigate = useNavigate();
    const [communications, setCommunications] = useState([]);
    const client = axios.create({
        baseURL: "http://localhost",
        headers: {'access-token': localStorage.getItem('accessToken')}
    });
    const getCommunications = async () => {
        const response = await client.get("/communications/1");
        const data = await response.data;
        setCommunications(data.payload.data);
    }

    const handleDeleteCommunication = async (id) => {
        const params = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "access-token": localStorage.getItem("accessToken"),
            }
        }
        const response = await fetch(`http://localhost/communications/${id}`, params)
        if (response.status === 200) {
            getCommunications().then(result=>console.log(result));
        }
    }

    const handleAddNewCommunicationClick = () => {
        navigate("/dashboard/communications/new");
    }
    useEffect(() => {
        getCommunications().then(result=>console.log(result));
    }, [communications, getCommunications, setCommunications]);
    return (
        <div className={"flex"}>
            <SideBar/>
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader/>
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col mt-10"}>
                        <div className={"flex flex-row mt-5 justify-end mr-20"}>
                            <button className={"bg-purple-700 p-2 rounded-lg text-white mb-5"}
                                    onClick={handleAddNewCommunicationClick}>Add New Communication
                            </button>
                        </div>
                        <Table data={communications} deleteCallback={handleDeleteCommunication}/>
                    </div>
                </div>
                <div className={"align-baseline"}>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Communications;