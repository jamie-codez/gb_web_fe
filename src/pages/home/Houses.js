import SideBar from "../../components/navigation/SideBar";
import NavHeader from "../../components/navigation/NavHeader";
import Footer from "../../components/navigation/Footer";
import HouseTable from "../../components/house/HouseTable";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Houses = () => {
    const [houses, setHouses] = useState([]);
    const navigate = useNavigate();

    const getHouses = useCallback(async () => {
        const params = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'access-token': localStorage.getItem('accessToken')
            }
        }

        const response = await fetch("http://localhost/houses/1", params);
        if (response.status === 200) {
            const data = await response.json();
            if (data.code === 453) {
                localStorage.clear();
                window.location.href = "/login"
            } else if (data.code === 200) {
                if (data.payload.data.length === 0) {
                    setHouses([]);
                    swal("No houses", "No houses found", "info");
                }
                setHouses(data.payload.data);
            } else {
                setHouses([]);
                alert(data.message);
            }
        } else {
            setHouses([]);
        }
    },[setHouses])

    const handleEditHouse = (id) => {
        navigate(`/dashboard/houses/${id}`);
    }

    const handleDeleteHouse = async (id) => {
        const params = {
            method: 'DELETE',
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(`http://localhost/house/${id}`, params);
        if (response.status === 200) {
            const data = await response.json();
            if (data.code === 200) {
                getHouses().then(response => console.log(response));
            } else if (data.code === 453) {
                localStorage.clear();
                window.href = "/login";
            } else {
                alert(data.message);
            }

        } else {
            alert("Error deleting user");
        }
    }

    const handleNavigate = (e) => {
        e.preventDefault();
        navigate(`/dashboard/houses/new/`);
    }

    useEffect(() => {
        getHouses().then(() => console.log("getHouses promise resolved"));
    }, [getHouses]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader />
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col w-full mt-10"}>
                        <div className={"flex flex-row mt-5 justify-end mr-20"}>
                            <button className={"bg-purple-700 p-2 rounded-lg text-white mb-5"} onClick={handleNavigate}>Add New House</button>
                        </div>
                        <HouseTable data={houses} editCallback={handleEditHouse} deleteCallback={handleDeleteHouse} />
                    </div>
                </div>
                <div className="fixed bottom-0 left-0 z-20 w-full">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Houses;