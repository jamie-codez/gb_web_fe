import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import UserForm from "../../components/UserForm";
import "../../index.css"
import { useEffect, useState } from "react";
import axios from "axios";
import CommunicationForm from "../../components/CommunicationForm";
import TenantForm from "../../components/TenantForm";
import { useParams,useNavigate } from "react-router-dom";

const TenantItemPage = () => {
    const [tenant, setTenant] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const getTenant = async () => {
        const params = {
            method: 'GET',
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        };
        const response = await fetch("http://localhost/users/1", params);
        if (response.status === 200) {
            const data = await response.json();
            if (data.status === 453) {
                return navigate("/login");
            }
            setTenant(data.payload);
        } else {
            setTenant({});
        }
    }
    useEffect(() => {
        if (id) {
            getTenant(id);
        }
    }, [tenant, setTenant]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen max-h-full"}>
                <NavHeader />
                <div className={"h-full mr-10 ml-10 mt-20"}>
                    <TenantForm />
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>)
}

export default TenantItemPage;