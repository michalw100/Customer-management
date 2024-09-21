import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileForm from '../forms/ProfileFrom';

export default function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isModalOpen } = location.state || { isModalOpen: false };

    const toggleModal = () => {
        navigate(-1); 
    };

    if (!isModalOpen) {
        return null;
    }

    return (
        <div id="default-modal" className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[600px]">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Profile Modal
                    </h3>
                    <button
                        type="button"
                        onClick={toggleModal}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="default-modal"
                    >
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                    <ProfileForm toggleModal={toggleModal} />
                </div>
            </div>
        </div>
    );
}