import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import { Table } from "./Dashboard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tenants = () => {
    const navigate = useNavigate();
    const [tenants, setTenants] = useState([]);

    const getTenants = async () => {
        const params = {
            method: 'GET',
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        };
        const response = await fetch("http://localhost/tenants/1", params);
        if (response.status === 200) {
            const data = await response.json();
            if (data.code === 453) {
                localStorage.clear();
                window.location.href = "/login"
            } else if(data.code===200) {
                setTenants(data.payload.data);
            }else{
                setTenants([]);
                alert(data.message);
            }
        } else {
            setTenants([]);
        }
    }

    const deleteTenant = async (id) => {
        const params = {
            method: 'DELETE',
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(`http://localhost/tenants/${id}`, params);
        if (response.status === 200) {
            const data= await response.json();
            if(data.code===200){
                getTenants().then(()=>console.log("getTenants promise resolved"));
            }else if(data.code===453){
                localStorage.clear();
                window.location.href="/login";
            }else{
                alert(data.message);
            }
            
        }else{
            alert("Error deleting user");
        }
    }

    const editTenant = (id) => {
        navigate(`/dashboard/tenants/${id}`);
    }

    const handleAddNewTenantClick = () => {
        navigate("/dashboard/tenants/new")
    }

    useEffect(() => {
        getTenants().then(()=>console.log("getTenants promise resolved"));
    }, [tenants, setTenants]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader />
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col w-full mt-10"}>
                        <div className={"flex flex-row mt-5 justify-end mr-20"}>
                            <button className={"bg-purple-700 p-2 rounded-lg text-white mb-5"}
                                onClick={handleAddNewTenantClick}>Add New Tenant
                            </button>
                        </div>
                        <Table data={tenants} editCallback={editTenant} deleteCallback={deleteTenant} />
                    </div>
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Tenants;