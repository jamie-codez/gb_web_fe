import {useState} from "react";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";

const HouseForm = ({houseData}) => {
    const [houseNumber, setHouseNumber] = useState(houseData ? houseData.houseNumber : "");
    const [rent, setRent] = useState(houseData ? houseData.rent : "");
    const [deposit, setDeposit] = useState(houseData ? houseData.deposit : "");
    const [floor, setFloor] = useState(houseData ? houseData.floor : "");
    const [occupied, setOccupied] = useState(houseData ? houseData.occupied : "");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const params = {
            method: 'POST',
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                houseNumber: houseNumber,
                rent: rent,
                deposit: deposit,
                floor: floor,
                occupied: occupied
            })
        };
        const response = await fetch(`http://localhost/houses`, params);
        if (response.status === 200) {
            const data = await response.json();
            if (data.status === 453) {
                return navigate("/login");
            }
            setHouseNumber(data.payload.houseNumber);
            setRent(data.payload.rent);
            setDeposit(data.payload.deposit);
            setFloor(data.payload.floor);
            setOccupied(data.payload.occupied);
        } else {
            alert("An error occurred try again");
        }
    }
    return (
        <div className={"account_form mt-10"}>
            <form onSubmit={e => {
                handleSubmit(e).then(response => {
                    swal("Success!", "Communication has been created successfully!", "success")
                        .then(r => console.log(r))

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
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="radio" name="floating_phone"
                               id="floating_phone"
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" " required/>
                        <label htmlFor="floating_phone"
                               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Occupied</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="radio" name="floating_company" id="floating_company"
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" " required/>
                        <label htmlFor="floating_company"
                               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Vacant</label>
                    </div>
                </div>
                <button type="submit" onClick={e => {
                    handleSubmit(e);
                    setLoading(true)
                }} className={`flex w-full btn justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "cursor-not-allowed opacity-25" : ""}`}>
                    Update
                < /button>
            </form>
        </div>
    )
}

export default HouseForm;