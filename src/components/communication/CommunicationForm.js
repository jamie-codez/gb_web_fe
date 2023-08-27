import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";


const CommunicationForm = ({ data }) => {
    const [to, setTo] = useState(data ? data.to : "");
    const [title, setTitle] = useState(data ? data.title : "");
    const [description, setDescription] = useState(data ? data.description : "");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    let verb;
    if (data) {
        verb = "PUT";
    } else {
        verb = "POST";
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        const params = {
            method: verb,
            headers: {
                "access-token": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to: to,
                title: title,
                description: description
            })
        };
        let response;
        if (verb === "PUT") {
            response = await fetch(`http://localhost/communications/${data._id}`, params);
        } else {
            response = await fetch(`http://localhost/communications`, params);
        }
        if (response.status === 200) {
            const data = await response.json();
            if (data.status === 453) {
                setLoading(false);
                return navigate("/login");
            } else if (data.status === 200 || data.status === 201) {
                setLoading(false);
                swal("Success!", "Communication has been created successfully!", "success").then(r => console.log(r));
                return navigate("/dashboard/communications");
            } else {
                setLoading(false);
                swal("Error!", data.message, "error").then(r => console.log(r));
            }
        } else {
            setLoading(false);
            swal("Error!", "Something went wrong!", "error")
        }
    }
    return (
        <div className={"account_form mt-10"}>
            <form onSubmit={e => {
                handleSubmit(e).then(() => console.log("Submit clicked"));
            }}>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="email" name="floating_email" id="floating_email" value={title} onChange={e => setTitle(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " required />
                    <label htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_password" id="floating_password" value={to} onChange={e => setTo(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " required />
                    <label htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">To
                        (Email address)</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="repeat_password" id="floating_repeat_password" value={description} onChange={e => setDescription(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " required />
                    <label htmlFor="floating_repeat_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                </div>
                <button type="submit" onClick={e => {
                    handleSubmit(e).then(() => console.log("Submit clicked"));
                }} className={`flex w-full btn justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "cursor-not-allowed opacity-25" : ""}`}>
                    {data ? "Update" : "Create"}
                </button>
            </form>
        </div>
    )
}

export default CommunicationForm;