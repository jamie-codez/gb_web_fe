import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import {Table} from "./Dashboard";
import {useState, useEffect} from "react";
import axios from "axios";

const Communications = () => {
    const [communications, setCommunications] = useState([]);
    const client = axios.create({
        baseURL: "http://localhost",
        headers: {'Content-Type': 'application/json', 'accessToken': localStorage.getItem('accessToken')}
    });
    const getCommunications = async () => {
        const response = await client.get("/communications/1",
            {});
        const data = await response.data;
        setCommunications(data.payload.data);
    }
    useEffect(() => {
        getCommunications();
    }, [communications, setCommunications]);
    return (
        <div className={"flex"}>
            <SideBar/>
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader/>
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col mt-10"}>
                        <div className={"flex flex-row mt-5 justify-end mr-20"}>
                            <button className={"bg-purple-700 p-2 rounded-lg text-white mb-5"}>Add New Communication</button>
                        </div>
                        <Table data={communications}/>
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