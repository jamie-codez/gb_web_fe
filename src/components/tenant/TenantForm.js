import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";

const TenantForm = ({tenantData}) => {
    const [clientEmail, setClientEmail] = useState(tenantData ? tenantData.email : "");
    const [houseNumber, setHouseNumber] = useState(tenantData ? tenantData.houseNumber : "");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    let verb;
    if (tenantData) {
        verb = "PUT";
    } else {
        verb = "POST";
    }

    const handleButtonClick = async (e) => {
        e.preventDefault()
        const params = {
            method: verb,
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                client: clientEmail,
                houseNumber: houseNumber
            })
        };
        let response;
        if(verb==="PUT"){
            response = await fetch(`http://localhost/tenants/${tenantData._id}`, params);
        }else{
            response = await fetch(`http://localhost/tenants`, params);
        }
        if (response.status === 200) {
            const data = await response.json();
            if (data.code === 453) {
                return navigate("/login");
            }else if(data.code === 200 || data.code === 201){
                setLoading(false);
                swal("Success!", "Tenant has been created successfully!", "success").then(r => console.log(r));
                return navigate("/dashboard/tenants");
            }else{
                swal("Info!", data.message, "info").then(r => console.log(r));
                setLoading(false);
            }
        } else {
            setClientEmail("");
            setHouseNumber("");
            alert("Error")
        }
    }
     useEffect(()=>{
        if(tenantData){
            setClientEmail(tenantData.email);
            setHouseNumber(tenantData.houseNumber);
        }
     },[clientEmail,setClientEmail,houseNumber,setHouseNumber,tenantData]);
    return (
        <div className={"account_form mt-10"}>
            <form onSubmit={e => {
                handleButtonClick(e).then(() => console.log("Submit clicked"));
                setLoading(true);
            }}>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="email" name="floating_email" id="floating_email" value={clientEmail} onChange={(e)=>{setClientEmail(e.target.value)}}
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required/>
                    <label htmlFor="floating_email"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tenant Email
                        address</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_password" id="floating_password" value={houseNumber} onChange={(e)=>{setHouseNumber(e.target.value)}}
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required/>
                    <label htmlFor="floating_password"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">House Number</label>
                </div>
                <button type="submit" onClick={e => {
                handleButtonClick(e).then(() => console.log("Submit clicked"));
                setLoading(true);
                }} className={`flex w-full btn justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "cursor-not-allowed opacity-25" : ""}`}>
                    {tenantData?"Update":"Create"}
                </button>
            </form>
        </div>
    )
}

export default TenantForm;