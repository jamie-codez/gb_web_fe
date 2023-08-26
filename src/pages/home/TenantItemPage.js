import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import "../../index.css"
import {useEffect, useState} from "react";
import TenantForm from "../../components/TenantForm";
import {useNavigate, useParams} from "react-router-dom";

const TenantItemPage = () => {
    const [tenant, setTenant] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getTenant = async () => {
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
            }else if(data.status===200){
                setTenant(data.payload);
            }else{
                alert(data.message);
                setTenant({});
            }
            
        } else {
            setTenant({});
        }
    }
    useEffect(() => {
        if (id) {
            getTenant(id).then(()=>console.log("getTenant Promise resolved"));
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
        </div>)
}

export default TenantItemPage;