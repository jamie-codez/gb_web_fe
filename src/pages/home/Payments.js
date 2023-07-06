import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import { Table } from "./Dashboard";
import { useState,useEffect } from "react";
import axios from "axios";

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const getPayments = async () => {
        const response = await axios.get("/api/payments");
        setPayments(response.data);
    }
    useEffect(() => {
        getPayments();
    }, [payments, setPayments])
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
    );
}

export default Payments;