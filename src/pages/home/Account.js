import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import UserForm from "../../components/UserForm";
import "../../index.css"
import { useState } from "react";
import { useParams } from "react-router-dom";

const Account = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();

    const getUser = async () => {
        const params = {
            method: 'GET',
            headers: {
                'access-token': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(`http://localhost/user/${id}`, params);
        if (response.status === 200) {
            const jsonData = await response.json();
            if (jsonData.payload.data) {
                alert("User not found");
                return;
            }
            setUser(jsonData.payload.data);
        }
    };
    if (id) {
        getUser();
   }

    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen max-h-full"}>
                <NavHeader />
                <div className={"h-full mr-10 ml-10 mt-20"}>
                    <UserForm  />
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Account;