import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import {Table} from "./Dashboard";
import {useState, useEffect} from "react";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";

const Payments = () => {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const client = axios.create({
        baseURL: "http://localhost",
        headers: {"access-token": localStorage.getItem("accessToken")}
    })
    const getPayments = async () => {
        const response = await client.get("/payments/all/1");
        const data = response.data
        setPayments(data.payload.data);
    }

    const handleAddNewPaymentClick = (e) => {
        navigate("dashboard/payment/new");
    }

    useEffect(() => {
        getPayments();
    }, [payments, setPayments])
    return (
        <div className={"flex"}>
            <SideBar/>
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader/>
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col w-full mt-10"}>
                        <div className={"flex flex-row mt-5 justify-end mr-20"}>
                            <button className={"bg-purple-700 p-2 rounded-lg text-white mb-5"}
                                    onClick={handleAddNewPaymentClick}>Add New Payment
                            </button>
                        </div>
                        <Table data={payments}/>
                    </div>
                </div>
                <div className={"align-baseline"}>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Payments;