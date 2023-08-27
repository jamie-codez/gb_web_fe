import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";

const HouseForm = ({houseData}) => {
    const [houseNumber, setHouseNumber] = useState("");
    const [rent, setRent] = useState("");
    const [deposit, setDeposit] = useState("");
    const [floor, setFloor] = useState("");
    const [occupied, setOccupied] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        let verb;
        if (houseData) {
            verb = "PUT";
        } else {
            verb = "POST";
        }
        const params = {
            method: verb,
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                houseNumber: houseNumber.toUpperCase(),
                rent: rent,
                deposit: deposit,
                floorNumber: floor,
                occupied: occupied
            })
        };
        let url;
        if (houseData) {
            url = `http://localhost/houses/${houseData.id}`;
        } else {
            url = `http://localhost/houses`;
        }
        const response = await fetch(url, params);
        if (response.status === 200) {
            const data = await response.json();
            if (data.status === 453) {
                return navigate("/login");
            }else if(data.code===201 || data.code===200){
                swal("Success!", "House has been created successfully!", "success").then(r => console.log(r))
                setLoading(false);
                navigate("/dashboard/houses");
            }else{
                swal("Error!", data.message, "error").then(r => console.log(r))
                setLoading(false);
            }
        } else {
            alert("An error occurred try again");
            setLoading(false);
        }
    }

    useEffect(() => {
        if (houseData) {
            setHouseNumber(houseData.houseNumber);
            setRent(houseData.rent);
            setDeposit(houseData.deposit);
            setFloor(houseData.floor);
            setOccupied(houseData.occupied);
        }
    }, [houseData,houseNumber,rent,deposit,floor,occupied, setHouseNumber, setRent, setDeposit, setFloor, setOccupied]);
    return (
        <div className={"account_form mt-10"}>
            <form onSubmit={e => {
                handleSubmit(e).then(response => {
                    swal("Success!", "House has been created successfully!", "success")
                        .then(() => console.log("promise resolved"))
                });
                setLoading(true);
            }}>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="email" name="floating_email" id="floating_email" value={houseNumber} onChange={(e) => {
                        setHouseNumber(e.target.value);
                    }}
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required/>
                    <label htmlFor="floating_email"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">House
                        number</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_password" id="floating_password" value={rent} onChange={(e) => {
                        setRent(e.target.value)
                    }}
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required/>
                    <label htmlFor="floating_password"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Rent</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="repeat_password" id="floating_repeat_password" value={deposit}
                           onChange={(e) => {
                               setDeposit(e.target.value)
                           }}
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required/>
                    <label htmlFor="floating_repeat_password"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Deposit
                    </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="number" name="floating_first_name" id="floating_first_name" value={floor}
                               onChange={(e) => {
                                   setFloor(e.target.value)
                               }}
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" " required/>
                        <label htmlFor="floating_first_name"
                               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Floor
                        </label>
                    </div>
                </div>
                <form>
                    <input type="radio" name="floating_phone"
                           id="floating_phone"
                           className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required/>
                    <label htmlFor="floating_phone"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Occupied</label>
                    <input type="radio" name="floating_company" id="floating_company"
                           className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required/>
                    <label htmlFor="floating_company"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Vacant</label>
                </form>
                <button type="submit" onClick={e => {
                    handleSubmit(e).then(() => console.log("promise resolved"));
                    setLoading(true)
                }} className={`flex w-full btn justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "cursor-not-allowed opacity-25" : ""}`}>
                    {houseData ? "Update" : "Create"}
                </button>
            </form>
        </div>
    )
}

export default HouseForm;