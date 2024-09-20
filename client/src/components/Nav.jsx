// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { GlobalContext } from '../context/GlobalContext';
// import { CgProfile } from "react-icons/cg";

// export default function Nav() {
//   const { logOut } = useContext(GlobalContext);

//   return (
//     <nav className="navbar bg-white dark:bg-gray-900 shadow-md rounded-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex-1">
//           <p className="btn btn-ghost text-xl">HI</p>
//         </div>
//         <div className="flex-none">
//           <div className="dropdown dropdown-end">
//             <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full">
//                 <CgProfile className="w-full h-full" />
//               </div>
//             </label>
//             <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
//               <li>
//                 <Link to="/profile" className="justify-between " data-modal-target="default-modal" data-modal-toggle="default-modal">
//                   Profile
//                   <span className="badge">New</span>
//                 </Link>
//               </li>
//               <li><Link to="/signIn" onClick={logOut}>Logout</Link></li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }


import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext';
import { CgProfile } from "react-icons/cg";
import Profile from '../pages/Profile';

export default function Nav() {
  const { logOut } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <nav className="navbar bg-white dark:bg-gray-900 shadow-md rounded-lg">
        <div className="container mx-auto px-4">
          <div className="flex-1">
            <p className="btn btn-ghost text-xl">HI</p>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <CgProfile className="w-full h-full" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <button onClick={toggleModal} className="justify-between">
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

      {/* Modal component */}
      {isModalOpen && ( <Profile toggleModal={toggleModal}/>

      )}
    </>
  );
}
