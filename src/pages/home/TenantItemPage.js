import SideBar from "../../components/navigation/SideBar";
import NavHeader from "../../components/navigation/NavHeader";
import Footer from "../../components/navigation/Footer";
import "../../index.css"
import { useEffect, useState, useCallback } from "react";
import TenantForm from "../../components/tenant/TenantForm";
import { useNavigate, useParams } from "react-router-dom";

const TenantItemPage = () => {
    const [tenant, setTenant] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const getTenant = useCallback(async () => {
        const params = {
            method: 'GET',
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(`http://localhost/tenants/${id}`, params);
        if (response.status === 200) {
            const data = await response.json();
            if (data.status === 453) {
                localStorage.clear();
                return navigate("/login");
            } else if (data.status === 200) {
                setTenant(data.payload);
            } else {
                alert(data.message);
                setTenant({});
            }

        } else {
            setTenant({});
        }
    }, [setTenant, navigate, id]);

    useEffect(() => {
        if (id) {
            getTenant(id).then(() => console.log("getTenant Promise resolved"));
        }
    }, [tenant, setTenant, id, getTenant]);
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
        </div>
    )
}

export default TenantItemPage;