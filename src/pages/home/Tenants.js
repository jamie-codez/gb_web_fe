import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import {Table} from "./Dashboard";
import axios from "axios";
import {useState, useEffect} from "react";
import {Navigate} from "react-router-dom";

const Tenants = () => {
    const [tenants, setTenants] = useState([]);
    const client = axios.create({
        baseURL: "http://localhost",
        headers: {"access-token": localStorage.getItem("accessToken")}
    })
    const getTenants = async () => {
        const response = await client.get("/tenants/1");
        const data = response.data;
        setTenants(data.payload.data);
    }

    const handleAddNewTenantClick = () => {
        return <Navigate to={"/tenant/new"} replace={true}/>;
    }

    useEffect(() => {
        getTenants();
    }, [tenants, setTenants]);
    return (
        <div className={"flex"}>
            <SideBar/>
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader/>
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col w-full mt-10"}>
                        <div className={"flex flex-row mt-5 justify-end mr-20"}>
                            <button className={"bg-purple-700 p-2 rounded-lg text-white mb-5"}
                                    onClick={handleAddNewTenantClick}>Add New Tenant
                            </button>
                        </div>
                        <Table data={tenants}/>
                    </div>
                </div>
                <div className={"align-baseline"}>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Tenants;