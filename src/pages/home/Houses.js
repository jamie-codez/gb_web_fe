import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import {Table} from "./Dashboard";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Houses = () => {
    const navigate = useNavigate();
    const [houses, setHouses] = useState([]);
    const getHouses = async () => {
        const params = {
            method: 'GET',
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        }
        const response = await fetch("http://localhost/houses/1", params);
        const data = await response.json();
        setHouses(data.payload.data);
    }
    const handleAddNewHouse = () => {
        navigate("/dashboard/houses/new");
    }
    useEffect(() => {
        getHouses();
    }, [houses, setHouses]);
    return (
        <div className={"flex"}>
            <SideBar/>
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader/>
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col w-full mt-10"}>
                        <div className={"flex flex-row mt-5 justify-end mr-20"}>
                            <button className={"bg-purple-700 p-2 rounded-lg text-white mb-5"}
                                    onClick={handleAddNewHouse}>Add New House
                            </button>
                        </div>
                        <Table data={houses}/>
                    </div>
                </div>
                <div className={"align-baseline"}>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Houses;