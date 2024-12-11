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
        
        <div className="flex items-center justify-center min-h-screen px-6 sm:px-0
    bg-gray-100">
        <img onClick={()=>navigate('/')}
       src={assets.logo} alt="" 
       className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>
            <div className="bg-white p-6 rounded shadow-lg w-full sm:w-1/2">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                {userData ? (
                    <div>
                        <div className="mb-4">
                            <label className="block font-semibold">Name:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full rounded"
                                />
                            ) : (
                                <p>{formData.name || 'Loading...'}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block font-semibold">Email:</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full rounded"
                                />
                            ) : (
                                <p>{formData.email || 'Loading...'}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block font-semibold">Password:</label>
                            {isEditing ? (
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full rounded"
                                    placeholder="Enter new password"
                                />
                            ) : (
                                <p>******</p> // Placeholder for the password field
                            )}
                        </div>

                        {isEditing ? (
                            <div className="flex gap-4">
                                <button
                                    onClick={handleSave}
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                ) : (
                    <p>User data is not available.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
