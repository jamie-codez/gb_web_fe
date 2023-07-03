import Dashboard from "./pages/home/Dashboard";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/home/Users";
import Houses from "./pages/home/Houses";
import Tenants from "./pages/home/Tenants";
import Payments from "./pages/home/Payments";
import Communications from "./pages/home/Communication";
import Communication from "./pages/home/Communication";
import Tasks from "./pages/home/Tasks";
import Analytics from "./pages/home/Analytics";
import Account from "./pages/home/Account";
import Settings from "./pages/home/Settings";
import NotFound from "./pages/404";
import EmailReset from "./pages/EmailReset";
import {useEffect, useState} from "react";


const AuthElement = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const authenticated = localStorage.getItem("authenticated");
        if (authenticated) {
            setIsLoggedIn(true);
            return <>{children}</>
        } else {
            return navigate("/login")
        }
    }, [isLoggedIn,navigate,children])
}

function App() {
    return (
        <Routes>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/"} element={<AuthElement><Dashboard/></AuthElement>}/>
            <Route path={"/dashboard"}>
                <Route index={true} element={<AuthElement><Dashboard/></AuthElement>}/>
                <Route path={"users"}>
                    <Route index={true} element={<AuthElement><Users/></AuthElement>}/>
                    <Route path={":id"} element={<AuthElement><Users/></AuthElement>}/>
                    <Route path={"new"} element={<AuthElement><Users/></AuthElement>}/>
                </Route>
                <Route path={"houses"}>
                    <Route index={true} element={<AuthElement><Houses/></AuthElement>}/>
                    <Route path={":id"} element={<AuthElement><Houses/></AuthElement>}/>
                    <Route path={"new"} element={<AuthElement><Houses/></AuthElement>}/>
                </Route>
                <Route path={"tenants"}>
                    <Route index={true} element={<AuthElement><Tenants/></AuthElement>}/>
                    <Route path={":id"} element={<AuthElement><Tenants/></AuthElement>}/>
                    <Route path={"new"} element={<AuthElement><Tenants/></AuthElement>}/>
                </Route>
                <Route path={"payments"}>
                    <Route index={true} element={<AuthElement><Payments/></AuthElement>}/>
                    <Route path={":id"} element={<AuthElement><Payments/></AuthElement>}/>
                    <Route path={"new"} element={<AuthElement><Payments/></AuthElement>}/>
                </Route>
                <Route path={"communications"}>
                    <Route index={true} element={<AuthElement><Communications/></AuthElement>}/>
                    <Route path={":id"} element={<AuthElement><Communication/></AuthElement>}/>
                    <Route path={"new"} element={<AuthElement><Communications/></AuthElement>}/>
                </Route>
                <Route path={"tasks"}>
                    <Route index={true} element={<AuthElement><Tasks/></AuthElement>}/>
                    <Route path={":id"} element={<AuthElement><Tasks/></AuthElement>}/>
                    <Route path={"new"} element={<AuthElement><Tasks/></AuthElement>}/>
                </Route>
                <Route path={"analytics"} element={<AuthElement><Analytics/></AuthElement>}/>
                <Route path={"account"} element={<AuthElement><Account/></AuthElement>}/>
                <Route path={"settings"} element={<AuthElement><Settings/></AuthElement>}/>
            </Route>
            <Route path={"/reset"} element={<EmailReset/>}/>
            <Route path={"*"} element={<NotFound/>}/>
        </Routes>
    );
}

export default App;
