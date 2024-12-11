import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const { userData, backendUrl, setUserData } = useContext(AppContext);
    const navigate = useNavigate()
    // State for edit mode and form fields
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSave = async () => {
        try {
            const { data } = await axios.put(`${backendUrl}/api/user/update-profile`, formData, {
                withCredentials: true
            });

            console.log("Response data:", data); // Log the response for inspection

            if (data.success) {
                // Check if user is available
                if (data.user && data.user.name) {
                    toast.success('Profile updated successfully!');
                    setUserData(data.user); // Update the context with new data
                    setFormData({
                        name: data.user.name,
                        email: data.user.email,
                        password: '', // Don't display the password
                    });
                    setIsEditing(false); // Exit editing mode
                } else {
                    toast.error('Error: Invalid response format');
                }
            } else {
                toast.error(data.message || 'Profile update failed');
            }
        } catch (error) {
            console.error("Error occurred during profile update:", error); // Log error message
            toast.error('An error occurred while updating the profile.');

            // Check if the error is a response error from axios
            if (error.response) {
                console.error("Error response:", error.response); // Log the error response for debugging
            } else {
                console.error("Error message:", error.message); // Log general error message
            }
        }
    };




    // Populate form data when userData is updated
    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name,
                email: userData.email,
                password: '', // Don't display the password initially
            });
        }
    }, [userData]);  // Dependency on userData ensures this effect runs when userData changes

    // If userData is null, show loading screen
    if (userData === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-6 rounded shadow-lg w-full sm:w-1/2">
                    <h1 className="text-2xl font-bold mb-4">Loading...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">

                    <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

                    <a href="#" className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full">
                        User Profile
                    </a>
                    <a href="#"
                        className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full">
                        Account Settings
                    </a>
                    <a href="#"
                        className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  ">
                        Notifications
                    </a>
                    <a href="#"
                        className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  ">
                        PRO Account
                    </a>
                </div>
            </aside>
            <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                <div className="p-2 md:p-4">
                    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                        <h2 className="pl-6 text-2xl font-bold sm:text-xl">User Profile</h2>
                        <div className="grid max-w-2xl mx-auto mt-8">
                            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                <img
                                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                    src={userData.profilePicture || "https://i.pinimg.com/550x/0e/51/7e/0e517eb57cb5a992ef3230b0e0d792af.jpg"}
                                    alt="User avatar"
                                />
                                <div className="flex flex-col space-y-5 sm:ml-8">
                                    <button
                                        type="button"
                                        aria-label="Change profile picture"
                                        className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                    >
                                        Change picture
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Delete profile picture"
                                        className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                    >
                                        Delete picture
                                    </button>
                                </div>
                            </div>
                            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                                <div
                                    className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    {userData ? (
                                        <div className="w-full">
                                            <label className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                                Full name
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                />           
                                            ) : (
                                                <p>{formData.name || 'Loading...'}</p>
                                            )}    
                                        </div>
                                        
                                        

                                    
                                    ) : (
                                        <p>User Data is not available.</p>
                                    )}            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </main >
        </div>
    );
};

export default Profile;
