import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const { update, setUpdate } = useAuth();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    full_name: "",
    password: "",
    confirmPassword: "",
  });
  const [errorUsernameMessage, setErrorUsernameMessage] = useState("")
  const [errorEmailMessage, setErrorEmailMessage] = useState("")
  const [errorFullnameMessage, setErrorFullnameMessage] = useState("")
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    // validate registration
    let isValid = true;
    let message = "";

    if (formData.password !== formData.confirmPassword) {
      isValid = false;
      message = "Passwords do not match.";
    }

    setResponseMessage(message);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      try {
        console.log(formData);
        const response = await fetch(`http://localhost:3000/api/register`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            full_name: formData.full_name,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setIsSuccess(true);
          setResponseMessage(data.message);
          setUpdate(!update);
          navigate("/feed");
        } else {
          setIsSuccess(false);
          setErrorUsernameMessage(data.errors.username);
          setErrorPasswordMessage(data.errors.password);
          setErrorEmailMessage(data.errors.email);
          setErrorFullnameMessage(data.errors.full_name);
          setResponseMessage(data.message);
        }
      } catch (err) {
        setIsSuccess(false);
        setResponseMessage("An error occurred. Please try again.");
        setErrorUsernameMessage(err.errors.username);
        setErrorPasswordMessage(err.errors.password);
        setErrorEmailMessage(err.errors.email);
        setErrorFullnameMessage(err.errors.full_name);
        console.log("Error: ", err);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <h2 className="text-3xl text-gray-800 mb-6 mt-24">
          Make the most of your professional life
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>

          {/* {responseMessage && !isSuccess && (
            <div className="text-red-500 text-sm py-2 text-center">
              {responseMessage}
            </div>
          )} */}

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-500 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {responseMessage && !isSuccess && errorUsernameMessage &&(
            <div className="text-red-500 text-sm py-2 text-left">{errorUsernameMessage}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-500 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {responseMessage && !isSuccess && errorEmailMessage &&(
            <div className="text-red-500 text-sm py-2 text-left">{errorEmailMessage}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="full_name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-500 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {responseMessage && !isSuccess && errorFullnameMessage &&(
            <div className="text-red-500 text-sm py-2 text-left">{errorFullnameMessage}</div>
            )}
          </div>
          <div className="mb-4">
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
            {responseMessage && !isSuccess && errorPasswordMessage &&(
            <div className="text-red-500 text-sm py-2 text-left">{errorPasswordMessage}</div>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-500 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold p-4 rounded-full hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>

          <div className="mt-4 text-center">
            <p>
              Already on LinkInPurry?
              <Link className="text-blue-600" to="/login">
                {" "}
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
