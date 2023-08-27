import SideBar from "../../components/navigation/SideBar";
import NavHeader from "../../components/navigation/NavHeader";
import Footer from "../../components/navigation/Footer";
import "../../index.css"
import {useEffect, useState} from "react";
import CommunicationForm from "../../components/communication/CommunicationForm";
import {useNavigate, useParams} from "react-router-dom";

const CommunicationItemPage = () => {
    const [communication, setCommunication] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                localStorage.clear();
                return navigate("/login");
            }else if(data.status===200){
                setCommunication(data.payload);
            }else{
                alert(data.message);
                setCommunication({});
            }
        } else {
            setCommunication({});
        }
    }

    useEffect(() => {
        if (id) {
            getCommunication(id).then(() => console.log("getCommunication promise resolved"))
        }
    }, [communication, getCommunication, id, setCommunication]);
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
        </div>
    )
}

export default CommunicationItemPage;