import SideBar from "../../components/navigation/SideBar";
import NavHeader from "../../components/navigation/NavHeader";
import Footer from "../../components/navigation/Footer";
import "../../index.css"

const Settings = () => {
    return (
        <div className={"flex"}>
            <SideBar/>
            <div className={"flex flex-col w-full h-screen"}>
                <NavHeader/>
                <div className={"h-full w-full"}>
                    <div className={"center items-center h-full font-bold text-3xl"}>
                        <h1>We are working on something great!! </h1>
                        <h1>Thank you for being patient🙂</h1>
                    </div>
                </div>
                <div className="fixed bottom-0 left-0 z-20 w-full">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Settings;