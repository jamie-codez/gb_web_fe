import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import { Table } from "./Dashboard";
import axios from "axios";
import { useState, useEffect } from "react";

const Tenants = () => {
    const [tenants, setTenants] = useState([]);
    const getTenants = async () => {
        const response = await axios.get("http://localhost:8080/api/tenants");
        setTenants(response.data);
    }

    useEffect(() => {
        getTenants();
    }, [tenants, setTenants]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader />
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col w-full mt-10"}>
                        <Table data={tenants} />
                    </div>
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Tenants;