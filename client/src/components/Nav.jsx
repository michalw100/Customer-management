import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext';
import { CgProfile } from "react-icons/cg";

export default function Nav() {
  const { logOut, user } = useContext(GlobalContext);
  const navigate = useNavigate();

  const showProfile = () => {
    navigate('/profile', { state: { isModalOpen: true } });
  }

  return (
    <nav className="navbar bg-white dark:bg-gray-700 shadow-md ">
      <div className="container mx-auto px-4">
        <div className="flex-1">
          <p className="btn btn-ghost text-xl">HI</p>
        </div>
        <p className='p-3'>Hi {user?.user_name}</p>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <CgProfile className="w-full h-full" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <button onClick={showProfile} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </button>
              </li>
              <li><Link to="/signIn" onClick={logOut}>Logout</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}