import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profilePic from "../assets/profile_pic copy.png";
import dropdownIcon from "../assets/dropdown_icon copy.svg";

const Navbar = ({ user, onLogout }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };

    return (
        <div className="bg-primary">
            <div className="container">
                <div className="flex justify-between items-center p-4">
                    <div className="text-[#E2D7AC]">
                        <Link to="/">
                            <h1 className="text-2xl">COOLKIDDO GAMES</h1>
                        </Link>
                    </div>

                    <div className="text-[#F5F4ED]">
                        <ul className="flex gap-4 items-center">
                            {!user ? (
                                <li>
                                    <Link
                                        to="/login"
                                        className="bg-[#3A8232] inline-block px-6 py-3 rounded-2xl font-semibold"
                                    >
                                        Login
                                    </Link>
                                </li>
                            ) : (
                                <li
                                    className="flex items-center gap-2 cursor-pointer group relative"
                                    onMouseEnter={handleMouseEnter} // Show dropdown on mouse enter
                                    onMouseLeave={handleMouseLeave} // Hide dropdown on mouse leave
                                >
                                    {/* Profile Picture */}
                                    <img
                                        className="w-9 rounded-full"
                                        src={profilePic}
                                        alt="Profile"
                                    />

                                    {/* Dropdown Icon */}
                                    <img className="w-2.5" src={dropdownIcon} alt="Dropdown" />

                                    {/* Dropdown Menu */}
                                    {showDropdown && (
                                        <div className="absolute top-0 right-0 pt-14 text-base text-gray-600 z-20 font-medium">
                                            <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                                                {/* Welcome */}
                                                <p
                                                    className="font-semibold text-gray-800">
                                                    Welcome, {user.name || 'User'}
                                                </p>

                                                {/* Profile */}
                                                <p
                                                    onClick={() => navigate('/profile')}
                                                    className="hover:text-green-600 cursor-pointer hover:font-semibold transition-all ease-in-out"
                                                >
                                                    My Profile
                                                </p>

                                                {/* My Rewards */}
                                                <p
                                                    onClick={() => navigate('/my-rewards')}
                                                    className="hover:text-green-700 cursor-pointer hover:font-semibold transition-all ease-in-out"
                                                >
                                                    My Rewards
                                                </p>

                                                {/* Logout */}
                                                <p
                                                    onClick={onLogout}
                                                    className="hover:text-red-600 cursor-pointer hover:font-semibold transition-all ease-in-out"
                                                >
                                                    Log Out
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
