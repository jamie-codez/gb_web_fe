import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import { Table } from "./Dashboard";
import { useState, useEffect } from "react";
import axios from "axios";

const Communications = () => {
    const [communications, setCommunications] = useState([]);
    const getCommunications = async () => {
        const response = await axios.get("http://localhost:5000/communications",
            { headers: { 'Content-Type': 'application/json', 'accessToken': localStorage.getItem('accessToken') } });
        const data = await response.json();
        setCommunications(data);
    }
    useEffect(() => {
        getCommunications();
    }, []);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader />
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col mt-10"}>
                        <Table data={communications} />
                    </div>
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Communications;