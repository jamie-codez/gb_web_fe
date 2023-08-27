import SideBar from "../../components/navigation/SideBar";
import NavHeader from "../../components/navigation/NavHeader";
import Footer from "../../components/navigation/Footer";
import "../../index.css"
import { useEffect, useState, useCallback } from "react";
import HouseForm from "../../components/house/HouseForm";
import { useNavigate, useParams } from "react-router-dom";

const HouseItemPage = () => {
    const [house, setHouse] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const getHouse = useCallback(async (id) => {
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
                localStorage.clear();
                return navigate("/login");
            } else if (data.status === 200) {
                setHouse(data.payload);
            } else {
                alert(data.message);
                setHouse({});
            }
        } else {
            setHouse({});
        }
    }, [setHouse, navigate])

    useEffect(() => {
        if (id) {
            getHouse(id).then(() => console.log("getHouse promise resolved"));
        }
    }, [getHouse, house, id, setHouse]);
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