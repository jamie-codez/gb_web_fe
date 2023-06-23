import SideBar from "../../components/SideBar";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";

const Dashboard = () => {
    return (
        <div>
            <SideBar/>
            <div>
                <NavHeader/>
                <div>Section</div>
                <Footer/>
            </div>
        </div>
    )
}

export default Dashboard;