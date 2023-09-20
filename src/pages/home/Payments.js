import SideBar from "../../components/navigation/SideBar";
import NavHeader from "../../components/navigation/NavHeader";
import Footer from "../../components/navigation/Footer";
import { useEffect, useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import PaymentTable from "../../components/payment/PaymentTable";

const Payments = () => {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);

    const getPayments = useCallback(async () => {
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
            if (data.code === 453) {
                localStorage.clear();
                window.location.href = "/login"
            } else if (data.code === 200) {
                if (!data.payload.data) {
                    setPayments([]);
                    console.log("No payments found");
                } else if (data.payload.data.length === 0) {
                    console.log("No payments found");
                } else {
                    setPayments(data.payload.data);
                }
            } else {
                setPayments([]);
                swal("Error", data.message, "error");
            }
        } else {
            setPayments([]);
        }
    },[setPayments]);

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
            const data = await response.json();
            if (data.code === 200) {
                getPayments().then(response => console.log(response));
            } else if (data.code === 453) {
                localStorage.clear();
                window.href = "/login";
            } else {
                swal("Success", data.message, "success");
            }
        } else {
            swal("Error", "An error occurred try again", "error");
        }
    }

    const handleAddNewPaymentClick = (e) => {
        e.preventDefault();
        navigate("/dashboard/payments/new");
    }

    useEffect(() => {
        getPayments().then(() => console.log("getPayments promise resolved"));
    }, [getPayments])
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader />
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col w-full mt-10"}>
                        <div className={"flex flex-row mt-5 justify-end mr-20"}>
                            <button className={"bg-purple-700 p-2 rounded-lg text-white mb-5"}
                                onClick={handleAddNewPaymentClick}>Add New Payment
                            </button>
                        </div>
                        <PaymentTable data={payments} deleteCallback={handleDeletePayment} />
                    </div>
                </div>
                {/* <div className={"align-baseline"}>
                    <Footer />
                </div> */}
                <div className="fixed bottom-0 left-0 z-20 w-full">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Payments;