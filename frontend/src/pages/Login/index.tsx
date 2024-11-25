import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../App.css"; // Import file CSS modul

export default function Login() {

    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const validate = () => {
        // validate login
        let isValid = true;
        let message = "";

        setResponseMessage(message);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const setCookie = (name: string, value: string, hours: number) => {
        const expires = new Date(Date.now() + hours * 3600 * 1000).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(validate()) {
            try {
                const response = await fetch(`http://localhost:3000/api/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                })

                const data = await response.json();

                if(response.ok) {
                    setIsSuccess(true);
                    setResponseMessage(data.message);
                    setCookie("token", data.body.token, 1);
                    navigate("/feed");
                } else {
                    setIsSuccess(false);
                    setResponseMessage(data.message);
                }
            } catch(err) {
                setIsSuccess(false);
                setResponseMessage("An error occurred. Please try again.");
                console.log("Error: ", err);
            }
        }
    };

    return (
        <>
            <div className="form-register-login bg-custom-bg-color min-h-screen">
                <div className="header-subtitle">Make the most of your professional life</div>
                <form onSubmit={handleSubmit} className="register-login-container">
                    <h2 className="register-login-subtitle">Login</h2>
                    {responseMessage && !isSuccess && (
                        <div className="">
                            {responseMessage}
                        </div>
                    )}
                    <div className="">
                        <label className="">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className=""
                        />
                    </div>
                    <div className="">
                        <label className="">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className=""
                        />
                    </div>
                    <button type = "submit" className="">Login</button>
                </form>
            </div>
        </>
    )
}