import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { PiPasswordDuotone } from "react-icons/pi";
import { SiGmail } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import axios from 'axios';

export default function ProfileForm({ toggleModal }) {
    const { user, setUser, logOut } = useContext(GlobalContext);

    const [error, setError] = useState("")
    const [values, setValues] = useState({
        user_email: user?.user_email,
        user_name: user?.user_name,
        user_password: "",
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };
    const handleUpdate = async () => {
        try {
            if (!values.user_email || !values.user_password || !values.user_name) {
                setError('All fields must be filled.');
                return;
            }
            const { data } = await axios.put(`http://localhost:3000/api/users/updateUser/${user._id}`, values);
            setError("");
            setUser(data);
            toggleModal(); 
        } catch (error) {
            setError(error.response?.data[0]?.message || error.message || "An error occurred");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/users/deleteUser/${user._id}`);
            toggleModal(); 
            setUser(null);
            logOut();
        } catch (error) {
            setError(error.response?.data[0]?.message || error.message || "An error occurred");
        }
    };

    return (
        <div>
            <label htmlFor="user_email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
            <div className="flex mb-6">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <SiGmail />
                </span>
                <input
                    type="text"
                    id="user_email"
                    name="user_email"
                    value={values.user_email}
                    onChange={handleChange}

                    className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="******" />
            </div>
            <label htmlFor="user_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
            <div className="flex mb-6">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <CgProfile />
                </span>
                <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={values.user_name}
                    onChange={handleChange}

                    className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="elonmusk" />
            </div>
            <label htmlFor="user_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>

            <div className="flex mb-6">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <PiPasswordDuotone />
                </span>
                <input
                    type="password"
                    id="user_password"
                    name="user_password"
                    value={values.user_password}
                    onChange={handleChange}

                    className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="******" />
            </div>
            {error && <p className="block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
            <div className="flex items-center justify-end space-x-4">
                <button
                    type="button"
                    onClick={toggleModal}
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleUpdate}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Update
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}