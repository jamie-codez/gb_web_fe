import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import "../../index.css"
import { useEffect, useState } from "react";
import PaymentForm from "../../components/PaymentForm";
import { useParams, useNavigate } from "react-router-dom";

const PaymentItemPage = () => {
    const [payment, setPayment] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    const getPayment = async (id) => {
        const params = {
            method: 'GET',
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(`http://localhost/payments/${id}`, params);
        if (response.status === 200) {
            const data = await response.json();
            if (data.status === 453) {
                return navigate("/login");
            }
            setPayment(data.payload);
        } else {
            setPayment({});
        }
    }


    useEffect(() => {
        if (id) {
            getPayment(id);
        }
    }, [payment, setPayment]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen max-h-full"}>
                <NavHeader />
                <div className={"h-full mr-10 ml-10 mt-20"}>
                    <PaymentForm />
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>)
}

export default PaymentItemPage;