import Dashboard from "./pages/home/Dashboard";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/home/Users";
import Houses from "./pages/home/Houses";
import Tenants from "./pages/home/Tenants";
import Payments from "./pages/home/Payments";
import Communication from "./pages/home/Communication";
import Tasks from "./pages/home/Tasks";
import Analytics from "./pages/home/Analytics";
import Account from "./pages/home/Account";
import Settings from "./pages/home/Settings";
import NotFound from "./pages/404";
import EmailReset from "./pages/EmailReset";
import {useEffect, useState} from "react";
import HouseItemPage from "./pages/home/HouseItemPage";
import TenantItemPage from "./pages/home/TenantItemPage";
import CommunicationItemPage from "./pages/home/CommunicationItemPage";
import TaskItemPage from "./pages/home/TaskItemPage";
import PaymentItemPage from "./pages/home/PaymentItemPage";


const ProtectedRoute = ({isLoggedIn, children}) => {
    if (!isLoggedIn) {
        return <Navigate to={"/login"} replace/>;
    }
    return children;
}


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const authenticated = localStorage.getItem("authenticated");
        if (authenticated) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [isLoggedIn, setIsLoggedIn]);
    return (
        <Routes>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/"} element={<ProtectedRoute isLoggedIn={isLoggedIn}><Dashboard/></ProtectedRoute>}/>
            <Route path={"/dashboard"}>
                <Route index={true} element={<ProtectedRoute isLoggedIn={isLoggedIn}><Dashboard/></ProtectedRoute>}/>
                <Route path={"users"}>
                    <Route index={true} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Users/></ProtectedRoute>}/>
                    <Route path={":id"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Account/></ProtectedRoute>}/>
                    <Route path={"new"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Account/></ProtectedRoute>}/>
                </Route>
                <Route path={"houses"}>
                    <Route index={true} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Houses/></ProtectedRoute>}/>
                    <Route path={":id"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <HouseItemPage/></ProtectedRoute>}/>
                    <Route path={"new"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <HouseItemPage/></ProtectedRoute>}/>
                </Route>
                <Route path={"tenants"}>
                    <Route index={true} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Tenants/></ProtectedRoute>}/>
                    <Route path={":id"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <TenantItemPage/></ProtectedRoute>}/>
                    <Route path={"new"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <TenantItemPage/></ProtectedRoute>}/>
                </Route>
                <Route path={"payments"}>
                    <Route index={true} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Payments/></ProtectedRoute>}/>
                    <Route path={":id"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <PaymentItemPage/></ProtectedRoute>}/>
                    <Route path={"new"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <PaymentItemPage/></ProtectedRoute>}/>
                </Route>
                <Route path={"communications"}>
                    <Route index={true} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Communication/></ProtectedRoute>}/>
                    <Route path={":id"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <CommunicationItemPage/></ProtectedRoute>}/>
                    <Route path={"new"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <CommunicationItemPage/></ProtectedRoute>}/>
                </Route>
                <Route path={"tasks"}>
                    <Route index={true} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Tasks/></ProtectedRoute>}/>
                    <Route path={":id"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <TaskItemPage/></ProtectedRoute>}/>
                    <Route path={"new"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <TaskItemPage/></ProtectedRoute>}/>
                </Route>
                <Route path={"analytics"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Analytics/></ProtectedRoute>}/>
                <Route path={"account"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Account/></ProtectedRoute>}/>
                <Route path={"settings"} element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Settings/></ProtectedRoute>}/>
            </Route>
            <Route path={"/reset"} element={<EmailReset/>}/>
            <Route path={"*"} element={<NotFound/>}/>
        </Routes>
    );
}

export default App;
