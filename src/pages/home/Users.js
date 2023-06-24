import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";

const Users = () => {
    return (
        <div className={"flex"}>
            <SideBar/>
            <div className={"flex flex-col w-full"}>
                <NavHeader/>
                <div className={"h-full"}>Section</div>
                <div className={"align-baseline bg-gray-300"}>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Users;