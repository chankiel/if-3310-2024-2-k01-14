import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIResponse } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom';

export default function Login() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const validate = () => {
    const isValid = true;
    const message = "";
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
        const res = await login({
          identifier: formData.identifier,
          password: formData.password,
        });

        setIsSuccess(true);
        setResponseMessage(res.message);
        navigate("/feed");
      } catch (err) {
        setIsSuccess(false);
        setResponseMessage((err as APIResponse).message);
        console.log("Error: ", err);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <h2 className="text-3xl text-gray-800 mb-6 mt-32">
          Stay updated on your professional world
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-4">
            Login
          </h2>

          {responseMessage && !isSuccess && (
            <div className="text-red-500 text-sm py-2 text-center">{responseMessage}</div>
          )}

          <div className="mb-4">
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700"
            >
              Username/Email
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-500 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-500 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold p-4 rounded-full hover:bg-blue-700 transition-colors"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p>
              New to LinkInPurry?
              <Link className="text-blue-600" to="/register"> Register here</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
