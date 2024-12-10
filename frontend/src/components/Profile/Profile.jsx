import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://localhost:5010/api/profile', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProfileData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-row justify-center items-start space-x-6 p-4 bg-white shadow-lg rounded-lg w-[90%]">
                {/* Left column */}
                <div className="max-w-xs w-full">
                    <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
                        <div className="relative mx-auto w-28 rounded-full">
                            <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2" />
                            <img
                                className="mx-auto h-auto w-full rounded-full"
                                src="https://i.pinimg.com/550x/0e/51/7e/0e517eb57cb5a992ef3230b0e0d792af.jpg"
                                alt=""
                            />
                        </div>
                        <h1 className="my-1 text-center text-lg font-bold leading-8 text-gray-900">
                            username{userData?.username}
                        </h1>
                        <h3 className="text-md text-center font-semibold leading-6 text-gray-600">
                            fullname{userData?.full_name}
                        </h3>
                        <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
                            email{userData?.email}
                        </p>
                        <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                            <li className="flex items-center py-3 text-sm">
                                <span>Level</span>
                                <span className="ml-auto">
                                    <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                                        Beginner
                                    </span>
                                </span>
                            </li>
                            <li className="flex items-center py-3 text-sm">
                                <span>Joined On</span>
                                <span className="ml-auto">Dec 13, 2024</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right column */}
                <div className="flex-grow">
                    <form className="bg-white shadow-sm p-6 rounded-lg">
                        <div className="mb-5">
                            <label htmlFor="username-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username-input"
                                aria-label="Username input"
                                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={userData?.username}
                                disabled
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your Email
                            </label>
                            <input
                                type="text"
                                id="email-input"
                                aria-label="Email input"
                                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={userData?.email}
                                disabled
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="fullname-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your Fullname
                            </label>
                            <input
                                type="text"
                                id="fullname-input"
                                aria-label="Fullname input"
                                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={userData?.full_name}
                                disabled
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phone-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your Phonenumber
                            </label>
                            <input
                                type="text"
                                id="phone-input"
                                aria-label="Phone input"
                                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={userData?.phone}
                                disabled
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Profile;
