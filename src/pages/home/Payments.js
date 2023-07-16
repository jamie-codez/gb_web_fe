import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import {Table} from "./Dashboard";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Payments = () => {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);

    const getPayments = async () => {
        const params = {
            method: 'GET',
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        }
        const response = await fetch("http://localhost/payments/1", params);
        if (response.status === 200) {
            const data = await response.json();
            setPayments(data.payload.data);
        }else {
            setPayments([]);
        }
    }
    const handleDeletePayment = async (id) => {
        const params = {
            method: 'DELETE',
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(`http://localhost/payments/${id}`, params);
        if (response.status === 200) {
            getPayments();
        }
    }

    const handleAddNewPaymentClick = (e) => {
        navigate("/dashboard/payments/new");
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
                        <Table data={payments} deleteCallback={handleDeletePayment}/>
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