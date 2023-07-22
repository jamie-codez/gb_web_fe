import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import "../../index.css"
import { useEffect, useState } from "react";
import CommunicationForm from "../../components/CommunicationForm";
import { useParams, useNavigate } from "react-router-dom";

const CommunicationItemPage = () => {
    const [communication, setCommunication] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const getCommunication = async (id) => {
        const params = {
            method: 'GET',
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(`http://localhost/communications/${id}`, params);
        if (response.status === 200) {
            const data = await response.json();
            if (data.status === 453) {
                return navigate("/login");
            }
            setCommunication(data.payload);
        } else {
            setCommunication({});
        }
    }

    useEffect(() => {
        if (id) {
            getCommunication(id)
        }
    }, [communication, setCommunication]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen max-h-full"}>
                <NavHeader />
                <div className={"h-full mr-10 ml-10 mt-20"}>
                    <CommunicationForm data={communication} />
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>)
}

export default CommunicationItemPage;