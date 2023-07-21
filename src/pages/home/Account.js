import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import UserForm from "../../components/UserForm";
import "../../index.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Account = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    console.log(id);

    const getUser = async (id) => {
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
            if (!jsonData.payload) {
                alert("User not found");
                return;
            }
            console.log(jsonData.payload);
            setUser(jsonData.payload);
        }
    };

    useEffect(() => {
        if (id) {
            getUser(id);
        }
    },[user,setUser]);


    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen max-h-full"}>
                <NavHeader />
                <div className={"h-full mr-10 ml-10 mt-20"}>
                    <UserForm userData={user} />
                </div>
                <div className={"align-baseline"}>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Account;