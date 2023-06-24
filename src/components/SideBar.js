import {IoIosArrowBack} from "react-icons/io";
import {useState} from "react";

const SideBar = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className={`${open ? " w-72" : "w-20"} duration-300 h-screen bg-dark-purple relative`}>
            <IoIosArrowBack
                className={"absolute cursor-pointer bg-white rounded-full -right-3 top-9 w-7 items-center justify-center pr-0.5 h-7 border-2 border-dark-purple"}
                onClick={() => setOpen(!open)}/>
        </div>
    )
}

export default SideBar;