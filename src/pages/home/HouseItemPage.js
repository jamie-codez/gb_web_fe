import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import UserForm from "../../components/UserForm";
import "../../index.css"
import { useEffect, useState } from "react";
import axios from "axios";
import CommunicationForm from "../../components/CommunicationForm";
import HouseForm from "../../components/HouseForm";
import { useParams, useNavigate } from "react-router-dom";

const HouseItemPage = () => {
    const [house, setHouse] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const getHouse = async (id) => {
        const params = {
            method: 'GET',
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(`http://localhost/houses/${id}`, params);
        if (response.status === 200) {
            const data = await response.json();
            if (data.status === 453) {
                return navigate("/login");
            }
            setHouse(data.payload);
        } else {
            setHouse({});
        }
    }

    useEffect(() => {
        if (id) {
            getHouse(id);
        }
    }, [house, setHouse]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen max-h-full"}>
                <NavHeader />
                <div className={"h-full mr-10 ml-10 mt-20"}>
                    <HouseForm />
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>)
}

export default HouseItemPage;