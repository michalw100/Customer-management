import React, { useState, useContext } from "react";
import '../App.css'
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [isLoginPage, setIsLoginPage] = useState(true);
  const [values, setValues] = useState({
    user_name: "",
    user_password: "",
    user_email: "",
  });
  const [error, setError] = useState("");
  const { setIsAuth, setUser } = useContext(GlobalContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isLoginPage && !values.user_password || !values.user_email) {
      setError("All fields must be filled!")
      return;
    }
    if (!isLoginPage && values.user_name == "" || values.user_email == "" || values.user_password == "") {
      setError("All fields must be filled!")
      return;
    }
    const path = isLoginPage ? "signIn" : "signUp";
    await authRequest(values, path);
  }

  async function authRequest(values, path) {
    path == "signIn" && delete values?.user_name;
    try {
      const { data } = await axios.post(`http://localhost:3000/api/users/${path}`, values, {
        withCredentials: true,
      });
      setIsAuth(true)
      setUser(data)
      navigate("/home");

    } catch (error) {
      setError(error.response?.data[0]?.message || "An unknown error occurred");
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')" }}>
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">My web site</h2>

              <p className="max-w-xl mt-3 text-gray-300">
              Web application for customer management
              To see more of the apps I built go to https://github.com/michalw100
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />                   </div>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                {isLoginPage ? "Sign in to access your account" : "Sign up to access account"}

              </p>
            </div>

            <div className="mt-8">
              <form>
                {!isLoginPage && (<div>
                  <label htmlFor="user_name" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">User Name</label>
                  <input id="user_name"
                    name="user_name"
                    type="text"
                    placeholder="joun doe"
                    onChange={(e) => handleChange(e)}
                    value={values.user_name || ""}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>)}
                <div className="mt-6">
                </div>
                <div>
                  <label htmlFor="user_email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                  <input id="user_email"
                    name="user_email"
                    type="text"
                    placeholder="example@example.com"
                    onChange={(e) => handleChange(e)}
                    value={values.user_email || ""}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="user_password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                  </div>

                  <input id="user_password"
                    name="user_password"
                    type="password"
                    onChange={(e) => handleChange(e)}
                    value={values.user_password || ""}
                    placeholder="Your Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div className="mt-6">
                </div>
                <p
                  id="error_result"
                  className="text-red-500 text-l font-semibold"
                >
                  {error}
                </p>
                <div className="mt-6">
                  <button onClick={handleSubmit} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    {isLoginPage ? "Sign In" : "Sign Up"}
                  </button>
                </div>

              </form>
              <p className="mt-6 text-sm text-center text-gray-400" onClick={() => setIsLoginPage((prev) => !prev)}>
                {isLoginPage ? "Don't have an account yet? " : "Already have an account? "}
                <Link onClick={(e) => { e.preventDefault(); setError(""); }} className="text-blue-500 focus:outline-none focus:underline hover:underline">
                  {isLoginPage ? "Sign up" : "Sign in"}
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>);
}
export default SignIn;