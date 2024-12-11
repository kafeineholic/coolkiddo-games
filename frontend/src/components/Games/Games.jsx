import React from "react";
import { FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { assets } from '../../assets/assets';

import memoGameImg from '../../assets/thumbnail/MemoGame.png'
import Img2048 from '../../assets/thumbnail/2048.png'
import FloppyBirdImg from '../../assets/thumbnail/FloppyBird.png'
import pacmanImg from '../../assets/thumbnail/PACMAN.png'
import whackAMoleImg from '../../assets/thumbnail/WhackAMole.png'
import TictactoeImg from '../../assets/thumbnail/TicTacToe.png'


const GameCardData = [
    {
        id: "Memo-game",
        title: "Memo-game",
        image: memoGameImg,
        players: 40,
    },
    {
        id: "2048-games",
        title: "2048-games",
        image: Img2048,
        players: 42,
    },
    {
        id: "Floppy-Bird",
        title: "FloppyBird",
        image: FloppyBirdImg,
        players: 45,
    },
    {
        id: "PacMan",
        title: "PacMan",
        image: pacmanImg,
        players: 50,
    },
    {
        id: "Tic-Tac-Toe",
        title: "Tic-Tac-Toe",
        image: TictactoeImg,
        players: 80,
    },
    {
        id: "WhackAMole",
        title: "WhackAMole",
        image: whackAMoleImg,
        players: 70,
    },
];

const Games = () => {
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        console.log(`Navigating to game with ID: ${id}`);
        navigate(`/games/${id}`);
    };

    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0
        bg-white'>
            <img
                src={assets.game}
                alt=""
                className="absolute left-5 sm:left-20 top-5 w-10 h-10  cursor-pointer"
            />

            <section className="py-10 bg-primary text-white">
                <div className="container">
                    {/* Header section */}
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">Games</h1>
                        <button className="bg-gray-400/50 text-white rounded-xl px-4 py-2">
                            View All
                        </button>
                    </div>
                    {/* Trending Games Card section */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-8">
                            {/* Games Card */}
                            {GameCardData.map((item) => (
                                <div
                                    className="cursor-pointer"
                                    key={item.id}
                                    onClick={() => handleNavigate(item.id)}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-[200px] object-cover rounded-xl"
                                    />
                                    <div className="text-center">
                                        <p>{item.title}</p>
                                        <p className="flex items-center justify-center gap-2">
                                            <FaFire />
                                            <span>{item.players}</span> players
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Games;