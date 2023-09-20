import SideBar from "../../components/navigation/SideBar";
import NavHeader from "../../components/navigation/NavHeader";
import Footer from "../../components/navigation/Footer";
import "../../index.css"
import {useEffect} from "react";
import HouseForm from "../../components/house/HouseForm";
import {useNavigate, useParams} from "react-router-dom";

const HouseItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

    }, [id, navigate]);
    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen max-h-full"}>
                <NavHeader />
                <div className={"h-full mr-10 ml-10 mt-20"}>
                    <HouseForm id={id}/>
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>)
}

export default HouseItemPage;