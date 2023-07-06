import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import { Table } from "./Dashboard";
import { useState, useEffect } from "react";
import axios from "axios";

const Houses = () => {
    const [houses, setHouses] = useState([]);
    const getHouses = async () => {
        const response = await axios.get("http://localhost:8000/api/houses",
            { headers: { 'Content-Type': 'application/json', 'accessToken': localStorage.getItem('accessToken') } });
        setHouses(response.data);
    }
    useEffect(() => {
        getHouses();
    }, [houses, setHouses]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader />
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col w-full mt-10"}>
                        <Table />
                    </div>
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Houses;