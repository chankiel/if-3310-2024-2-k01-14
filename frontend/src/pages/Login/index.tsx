import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });

    const validate = () => {
        let isValid = true;
        let message = "";
        setResponseMessage(message);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await fetch(`http://localhost:3000/api/login`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        identifier: formData.identifier,
                        password: formData.password,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setIsSuccess(true);
                    setResponseMessage(data.message);
                    navigate("/feed");
                } else {
                    setIsSuccess(false);
                    setResponseMessage(data.message);
                }
            } catch (err) {
                setIsSuccess(false);
                setResponseMessage("An error occurred. Please try again.");
                console.log("Error: ", err);
            }
        }
    };

    return (
        <>
            <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Make the most of your professional life</h2>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                >
                    <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
                    {responseMessage && !isSuccess && (
                        <div className="text-red-500 text-sm mb-4">{responseMessage}</div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                            Username/Email
                        </label>
                        <input
                            type="identifier"
                            id="identifier"
                            name="identifier"
                            value={formData.identifier}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    );
}
