import {useState} from "react";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";

const EmailReset = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch("http://localhost/sendPasswordResetEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        }).then(async response => response.json())
            .then(async data => {
                if (data.code === 200) {
                    swal("Success", data.message, "success", {
                        buttons: false,
                        timer: 2000
                    }).then(() => {
                        console.log("Sweet alert")
                        setLoading(false);
                        navigate("/login")
                    })
                } else {
                    swal("Failed", data.message, "error", {
                        buttons: false,
                        timer: 2000
                    }).then(() => {
                        console.log("Sweet alert")
                        setLoading(false);
                    })
                }
            });
    }

    return (
        <div className={"flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"}>
            <div className={"mt-10 sm:mx-auto sm:w-full sm:max-w-sm"}>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="email"
                                   className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        </div>
                        <div className="mt-2">
                            <input id="email" name="password" placeholder={"Email address"}
                                   type="email"
                                   autoComplete="email"
                                   required onChange={e => setEmail(e.target.value)}
                                   className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <button type="submit" onClick={handleSubmit}
                                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "cursor-not-allowed opacity-25" : ""}`}>Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmailReset;