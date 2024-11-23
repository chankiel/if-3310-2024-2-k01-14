import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Register() {

    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const validate = () => {
        // validate registration
        let isValid = true;
        let message = "";

        if(formData.password !== formData.confirmPassword) {
            isValid = false;
            message = "Passwords do not match.";
        }

        setResponseMessage(message);
        return isValid;
    };

    const setCookie = (name: string, value: string, hours: number) => {
        const expires = new Date(Date.now() + hours * 3600 * 1000).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(validate()) {
            try {
                const response = await fetch(`http://localhost:3000/api/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        name: formData.name,
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
    }

    return (
        <>
            <div className="bg-custom-bg-color min-h-screen">
                <div className="">Make the most of your professional life</div>
                <form onSubmit={handleSubmit} className="">
                    <h2 className="">Sign Up</h2>
                    {responseMessage && !isSuccess && (
                        <div className="">
                            {responseMessage}
                        </div>
                    )}
                    <div className="">
                        <label className="">Username</label>
                        <input 
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className=""
                        />
                    </div>
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
                        <label className="">Name</label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
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
                    <div className="">
                        <label className="">Confirm Password</label>
                        <input 
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className=""
                        />
                    </div>
                    <button type = "submit" className="">Sign Up</button>
                </form>
            </div>
        </>
    )
}