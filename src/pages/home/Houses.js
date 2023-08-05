import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import {Table} from "./Dashboard";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Houses = () => {
    const [houses, setHouses] = useState([]);
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        e.preventDefault();
        navigate(`/houses/new/`);
    }
    
    useEffect(() => {
        const getHouses = async () => {
            const params = {
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('accessToken')
                }
            }

            const response = await fetch("http://localhost/houses/1",params);
            if(response.status===200){
                const data = response.json();
                if(data.code===453){
                    localStorage.clear();
                    window.location.href="/login"
                }else{
                setHouses(data.payload.data);}
            }else{
                setHouses([])
            }
        }
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
                            <button className={"bg-purple-700 p-2 rounded-lg text-white mb-5"} onClick={handleNavigate}>Add New House</button>
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