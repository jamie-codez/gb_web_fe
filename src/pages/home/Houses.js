import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import { HouseRow, Table } from "./Dashboard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const HouseTable = ({ data, editCallback, deleteCallback }) => {
    return (
        <div>
            {
                data.length === 0 ? <div className={"flex flex-col justify-center items-center"}>
                    <h2 className={"text-xl font-bold mt-20"}>No data available</h2>
                </div> : <div className={"table"}>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((userData, index) => {
                                return <HouseRow user={userData} editCallback={editCallback} deleteCallback={deleteCallback} />
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}

const Houses = () => {
    const [houses, setHouses] = useState([]);
    const navigate = useNavigate();

    const getHouses = async () => {
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
                setHouses(data.payload.data);
            } else {
                setHouses([]);
                alert(data.message);
            }
        } else {
            setHouses([]);
        }
    }

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
        const response = await fetch(`http://localhost/payments/${id}`, params);
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
    });
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
                        <Table data={houses} editCallback={handleEditHouse} deleteCallback={handleDeleteHouse} />
                    </div>
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Houses;