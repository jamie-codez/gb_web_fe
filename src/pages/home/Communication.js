import SideBar from "../../components/navigation/SideBar";
import NavHeader from "../../components/navigation/NavHeader";
import Footer from "../../components/navigation/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import CommunicationTable from "../../components/communication/CommunicationTable";
import swal from "sweetalert";

const Communications = () => {
    const navigate = useNavigate();
    const [communications, setCommunications] = useState([]);

    const getCommunications = useCallback(async () => {
        const params = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'access-token': localStorage.getItem('accessToken')
            }
        }

        const response = await fetch("http://localhost/communications/1", params);
        if (response.status === 200) {
            const data = await response.json();
            if (data.code === 453) {
                localStorage.clear();
                window.location.href = "/login"
            } else if (data.code === 200) {
                setCommunications(data.payload.data);
            } else {
                setCommunications([]);
                alert(data.message);
            }
        } else {
            setCommunications([])
        }
    }, [setCommunications])

    const handleEditCommunication = (id) => {
        navigate(`/dashboard/communications/${id}`);
    }

    const handleDeleteCommunication = async (id) => {
        const params = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "access-token": localStorage.getItem("accessToken"),
            }
        }
        const response = await fetch(`http://localhost/communications/${id}`, params)
        if (response.status === 200) {
            const data = await response.json();
            if (data.code === 200) {
                getCommunications().then(() => console.log("getCommunication promise resolved"));
            } else if (data.code === 453) {
                localStorage.clear();
                navigate("/login");
            } else {
                getCommunications().then(() => console.log("getCommunication promise resolved"));
            }
        } else {
            swal("Error", "Something went wrong", "error");
        }
    }


    const handleAddNewCommunicationClick = () => {
        navigate("/dashboard/communications/new");
    }

    useEffect(() => {
        getCommunications().then(() => console.log("getCommunication promise resolved"));
    }, [getCommunications]);
    
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader />
                <div className={"h-full w-full"}>
                    <div className={"flex flex-col mt-10"}>
                        <div className={"flex flex-row mt-5 justify-end mr-20"}>
                            <button className={"bg-purple-700 p-2 rounded-lg text-white mb-5"}
                                onClick={handleAddNewCommunicationClick}>Add New Communication
                            </button>
                        </div>
                        <CommunicationTable data={communications} editCallback={handleEditCommunication} deleteCallback={handleDeleteCommunication} />
                    </div>
                </div>
                <div className="fixed bottom-0 left-0 z-20 w-full">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Communications;