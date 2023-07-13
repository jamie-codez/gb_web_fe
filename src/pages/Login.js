import logo from "../assets/logo.png";
import {useEffect, useState} from "react";
import swal from "sweetalert";
import {Link, useNavigate} from "react-router-dom";
import Dashboard from "./home/Dashboard";

const Login = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(JSON.stringify({email, password}));
        fetch("http://localhost/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({email, password})
        }).then(async response => await response.json())
            .then(async data => {
                if (data.code === 200) {
                    await swal("Success", data.message, "success", {
                        buttons: false,
                        timer: 2000
                    }).then(() => {
                        localStorage.setItem("accessToken", data.payload.accessToken);
                        localStorage.setItem("refreshToken", data.payload.refreshToken);
                        localStorage.setItem("authenticated", true);
                        window.location.href = "/dashboard";
                        // navigate("/dashboard");
                    });
                } else {
                    swal("Error occurred", data.message, "error", {
                        buttons: true,
                        timer: 5000
                    }).then(() => {
                        console.log(data.message);
                    });
                }
            }).catch(error => {
            swal("Error occurred", error, "error", {
                buttons: true,
                timer: 5000
            }).then(() => {
                console.log(error);
            });
        });
        setLoading(false);
    }

    useEffect(() => {
        const authenticated = localStorage.getItem("authenticated");
        if (authenticated) {
            setIsAuthenticated(true);
        }
    }, [isAuthenticated])
    return (
        <div>
            {isAuthenticated ? <Dashboard/> :
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto"
                             src={logo} alt="Green Bay"/>
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign
                            in to your account</h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleLoginSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email
                                    address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" placeholder={"name@company.com"}
                                           autoComplete="email" required
                                           onChange={e => setEmail(e.target.value)}
                                           className="block w-full rounded-md px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <div className="text-sm">
                                        <Link to="/reset"
                                              className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
                                            password?</Link>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input id="password" name="password" placeholder={"****************"}
                                           type="password"
                                           autoComplete="current-password"
                                           required onChange={e => setPassword(e.target.value)}
                                           className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <div>
                                <button type="submit"
                                        className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "cursor-not-allowed opacity-25" : ""}`}>Sign
                                    in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}

export default Login;