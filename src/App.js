import Dashboard from "./pages/home/Dashboard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/home/Users";
import Houses from "./pages/home/Houses";
import Tenants from "./pages/home/Tenants";
import Payments from "./pages/home/Payments";
import Communications from "./pages/home/Communication";
import Tasks from "./pages/home/Tasks";
import Analytics from "./pages/home/Analytics";
import Account from "./pages/home/Account";
import Communication from "./pages/home/Communication";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/"} element={<Dashboard/>}/>
                    <Route path={"/userz"} element={<Users/>}/>
                    <Route path={"/dashboard"}>
                        <Route index={true} element={<Dashboard/>}/>
                        <Route path={"users"}>
                            <Route index={true} element={<Users/>}/>
                            <Route path={":id"} element={<Users/>}/>
                            <Route path={"new"} element={<Users/>}/>
                        </Route>
                        <Route path={"houses"}>
                            <Route index={true} element={<Houses/>}/>
                            <Route path={":id"} element={<Houses/>}/>
                            <Route path={"new"} element={<Houses/>}/>
                        </Route>
                        <Route path={"tenants"}>
                            <Route index={true} element={<Tenants/>}/>
                            <Route path={":id"} element={<Tenants/>}/>
                            <Route path={"new"} element={<Tenants/>}/>
                        </Route>
                        <Route path={"payments"}>
                            <Route index={true} element={<Payments/>}/>
                            <Route path={":id"} element={<Payments/>}/>
                            <Route path={"new"} element={<Payments/>}/>
                        </Route>
                        <Route path={"communications"}>
                            <Route index={true} element={<Communications/>}/>
                            <Route path={":id"} element={<Communication/>}/>
                            <Route path={"new"} element={<Communications/>}/>
                        </Route>
                        <Route path={"tasks"}>
                            <Route index={true} element={<Tasks/>}/>
                            <Route path={":id"} element={<Tasks/>}/>
                            <Route path={"new"} element={<Tasks/>}/>
                        </Route>
                        <Route path={"analytics"} element={<Analytics/>}/>
                        <Route path={"account"} element={<Account/>}/>
                    </Route>
                </Routes>
                {/*    <Routes>*/}
                {/*        <Route path={"/"} element={<Dashboard/>}/>*/}
                {/*    </Routes>*/}
                {/*<Route index={true} path={"/"} element={<Dashboard/>}/>*/}
                {/*<Route path={"/login"} element={<Login/>}/>*/}
                {/*<Routes>*/}
                {/*    <Route index={true} path={"/"} element={<Dashboard/>}/>*/}
                {/*    <Route path={"/dashboard"} element={<Dashboard/>}/>*/}
                {/*    <Route path={"/users"} element={<Users/>}/>*/}
                {/*    <Route path={"/users/:id"} element={<Users/>}/>*/}
                {/*    <Route path={"/houses"} element={<Houses/>}/>*/}
                {/*    <Route path={"/tenants"} element={<Tenants/>}/>*/}
                {/*    <Route path={"/payments"} element={<Payments/>}/>*/}
                {/*    <Route path={"/communications"} element={<Communications/>}/>*/}
                {/*    <Route path={"/tasks"} element={<Tasks/>}/>*/}
                {/*    <Route path={"/analytics"} element={<Analytics/>}/>*/}
                {/*    <Route path={"/account"} element={<Account/>}/>*/}
                {/*</Routes>*/}
                {/*<Dashboard/>*/}
            </BrowserRouter>
        </div>
    );
}

export default App;
