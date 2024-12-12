import React from "react";
import { FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { assets } from '../../assets/assets';
import { Carousel , iconButton } from "@material-tailwind/react";
// import { Carousel } from 'flowbite-react';



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

    const Navbar = () => {
        return (
            <div className="w-full flex justify-between items-center py-2 px-4 sm:py-3 sm:px-16 absolute top-0 bg-[#40826d] z-10">
                <img
                    onClick={() => navigate('/')}
                    src={assets.game}
                    alt="Game Logo"
                    className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer"
                />
                <h1 className="text-xl sm:text-2xl text-white font-bold">Games</h1>
            </div>
        );
    };


    const handleNavigate = (id) => {
        console.log(`Navigating to game with ID: ${id}`);
        navigate(`/games/${id}`);
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-0
        bg-[#97051d]'>
            <Navbar />


            <section className="w-full mb-10 mt-20 flex-shrink-0"> {/* Add width and margin bottom */}
            <Carousel 
                className="rounded-l w-full mt-16"

                autoplay = {true}
                loop = {true}
                
                // Added margin bottom to separate from cards
                navigation={({ setActiveIndex, activeIndex, length }) => (

                    
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                    activeIndex === i 
                                    ? "w-8 bg-white" 
                                    : "w-4 bg-white/50"
                                }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                    
                )}
                
            >
                <div className="relative h-full w-[100vw]">
                <img
                    src={whackAMoleImg}
                    alt="image 1"
                    className="h-[400px] w-full object-cover object-bottom"
                />
                </div>
                
                <div className="relative h-full w-[100vw]">
                <img
                    src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                    alt="image 2"
                    className="h-[400px] w-full object-cover"
                />
                </div>
                <div className="relative h-full w-[100vw]">
                <img
                    src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                    alt="image 2"
                    className="h-[400px] w-full object-cover"
                />
                </div>
                <div className="relative h-full w-[100vw]">
                <img
                    src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                    alt="image 2"
                    className="h-[400px] w-full object-cover"
                />
                </div>
                
            </Carousel>

            
        </section>




            <section className="py-10 bg-primary text-white pt-16">
                <div className="container">
                    {/* Header section */}
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">Games</h1>
                        {/* <button className="bg-gray-400/50 text-white rounded-xl px-4 py-2">
                            View All
                        </button> */}
                    </div>
                    {/* Trending Games Card section */}
                    <div>
                        <div className="grid grid-cols-3 gap-4 mt-10">
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
                                        className="w-full h-[200px] object-cover rounded-xl shadow-xl
                                        transition-transform transform hover:scale-105 hover:shadow-2xl rounded-xl"
                                    />
                                    <div className="text-center mt-5">
                                        <p>{item.title}</p>
                                        <p className="flex items-center justify-center gap-2 mb-5">
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