import SideBar from "../../components/navigation/SideBar";
import NavHeader from "../../components/navigation/NavHeader";
import Footer from "../../components/navigation/Footer";
import UserForm from "../../components/user/UserForm";
import "../../index.css"
import {useCallback, useEffect, useState} from "react";
import {useParams,useNavigate} from "react-router-dom";

const Account = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);

    const getUser = useCallback(async(id) => {
        const params = {
            method: 'GET',
            headers: {
                'access-token': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(`http://localhost/user/${id}`, params);
        if (response.status === 200) {
            const data = await response.json();
            if (data.status === 453) {
                localStorage.clear();
                return navigate("/login");
            }else if(data.status===200){
                setUser(data.payload);
            }else{
                setUser({});
            }
        } else {
            setUser({});
        }
    },[setUser,navigate]);

    useEffect(() => {
        if (id) {
            getUser(id).then(result => console.log(result));
        }
    }, [user, setUser, id,getUser]);


    return (
        <div className={"flex"}>
            <SideBar />
            <div className={"flex flex-col w-full h-screen max-h-full"}>
                <NavHeader />
                <div className={"h-full mr-10 ml-10 mt-20"}>
                    <UserForm userData={user} />
                </div>
                <div className="fixed bottom-0 left-0 z-20 w-full">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Account;