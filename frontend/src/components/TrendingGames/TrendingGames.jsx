import React from 'react';
import { FaFire } from "react-icons/fa";


const GameCardData = [
    {
        id: 1,
        title: "Game Title",
        image: "https://via.placeholder.com/150",
        players: 40,
    },
    {
        id: 2,
        title: "Game Title1",
        image: "https://via.placeholder.com/150",
        players: 42,
    },
    {
        id: 3,
        title: "Game Title2",
        image: "https://via.placeholder.com/150",
        players: 45,
    },
    {
        id: 4,
        title: "Game Title3",
        image: "https://via.placeholder.com/150",
        players: 50,
    },
    {
        id: 5,
        title: "Game Title",
        image: "https://via.placeholder.com/150",
        players: 70,
    },
    {
        id: 6,
        title: "Game Title5",
        image: "https://via.placeholder.com/150",
        players: 80,
    },
]

const TrendingGames = () => {
    return (
        <>
            <section className="py-10 bg-primary text-white">
                <div className="container">
                    {/* Header section */}
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">
                            Trending Games
                        </h1>
                        <button className="bg-gray-400/50 text-white rounded-xl px-4 py-2">
                            View All
                        </button>
                    </div>
                    {/* Trending Games Card section */}
                    <div>
                        <div className="grid grid-cols-1 
                        md:grid-cols-6 gap-4 mt-8">
                            {/* Games Card */}
                            {GameCardData.map((item) => {
                                return (
                                    <div className="" key={item.id}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-[200px] object-cover rounded-xl"
                                        />
                                        <div className="text-center">
                                            <p>{item.title}</p>
                                            <p className="flex items-center justify-center gap-2">
                                                <FaFire />
                                                <span>{item.players}
                                                </span> players
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TrendingGames;