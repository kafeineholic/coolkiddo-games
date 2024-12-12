import React, { useState } from "react";
import { FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { assets } from '../../assets/assets';
import { Carousel, iconButton, Typography, Button } from "@material-tailwind/react";
// import { Carousel } from 'flowbite-react';

import gameBg from '../Games/gamebg.png';

import memoGameImg from '../../assets/thumbnail/MemoGame.png'
import Img2048 from '../../assets/thumbnail/2048.png'
import FloppyBirdImg from '../../assets/thumbnail/FloppyBird.png'
import pacmanImg from '../../assets/thumbnail/PACMAN.png'
import whackAMoleImg from '../../assets/thumbnail/WhackAMole.png'
import TictactoeImg from '../../assets/thumbnail/TicTacToe.png'


const GameCardData = [
    {
        id: "Memo-game",
        title: "Fruits Monster",
        image: memoGameImg,
        players: 40,
    },
    {
        id: "2048-games",
        title: "2048",
        image: Img2048,
        players: 42,
    },
    {
        id: "Floppy-Bird",
        title: "Floppy Birds",
        image: FloppyBirdImg,
        players: 45,
    },
    {
        id: "PacMan",
        title: "PAC-MAN",
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
        title: "Whack A Mole",
        image: whackAMoleImg,
        players: 70,
    },
];



const Games = () => {
    const navigate = useNavigate();
    const [autoPlay, setAutoPlay] = useState(true);

    const Navbar = () => {
        return (
            <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 bg-[transparent]">
                <img
                    onClick={() => navigate('/')}
                    src={assets.game}
                    alt=""
                    className="h-20 sm:h-12 object-contain cursor-pointer"
                    style={{ width: "auto" }}
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
        <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-0'
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(${gameBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                minHeight: '100vh',
            }}>
            <Navbar />

            <section className="w-full mb-10 mt-20 flex-shrink-0 group relative"
                onMouseEnter={() => setAutoPlay(false)} // Stop autoplay on hover
                onMouseLeave={() => setAutoPlay(true)} > {/* Add width and margin bottom */}
                <Carousel
                    className="rounded-l w-full mt-16"

                    autoplay={autoPlay}
                    autoplayDelay={1000}

                    loop={true}

                    navigation={({ setActiveIndex, activeIndex, length }) => (


                        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                            {new Array(length).fill("").map((_, i) => (
                                <span
                                    key={i}
                                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i
                                        ? "w-8 bg-white"
                                        : "w-4 bg-white/50"
                                        }`}
                                    onClick={() => setActiveIndex(i)}
                                />
                            ))}
                        </div>

                    )}

                >
                    <div className="relative h-full w-[100vw] group">
                        <img
                            src={whackAMoleImg}
                            className="h-[400px] w-full object-cover object-bottom"
                        />

                        <div className="absolute inset-0 grid h-full w-full 
                        place-items-center bg-black/50 
                        opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="w-3/4 text-center md:w-2/4">
                                <Typography
                                    variant="h1"
                                    color="white"
                                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                                >
                                    Whack A Mole
                                </Typography>
                            </div>
                            <div className="flex justify-center gap-2">
                                <Button size="lg" color="red"
                                    onClick={() => handleNavigate("WhackAMole")}>
                                    PLAY GAMES
                                </Button>
                            </div>
                        </div>
                    </div>


                    <div className="relative h-full w-[100vw] group">
                        <img
                            src={TictactoeImg}
                            className="h-[400px] w-full object-cover"
                        />
                        <div className="absolute inset-0 grid h-full w-full 
                        place-items-center bg-black/50 
                        opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="w-3/4 text-center md:w-2/4">
                                <Typography
                                    variant="h1"
                                    color="white"
                                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                                >
                                    Tic-Tac-Toe
                                </Typography>
                            </div>
                            <div className="flex justify-center gap-2">
                                <Button
                                    size="lg"
                                    color="red"
                                    onClick={() => handleNavigate("Tic-Tac-Toe")}>
                                    PLAY GAMES
                                </Button>
                            </div>
                        </div>
                    </div>


                    <div className="relative h-full w-[100vw] group">
                        <img
                            src={pacmanImg}
                            className="h-[400px] w-full object-cover"
                        />
                        <div className="absolute inset-0 grid h-full w-full 
                        place-items-center bg-black/50 
                        opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="w-3/4 text-center md:w-2/4">
                                <Typography
                                    variant="h1"
                                    color="white"
                                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                                >
                                    PAC-MAN
                                </Typography>
                            </div>
                            <div className="flex justify-center gap-2">
                                <Button size="lg" color="red"
                                    onClick={() => handleNavigate("PacMan")}>
                                    PLAY GAMES
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-full w-[100vw] group">
                        <img
                            src={FloppyBirdImg}
                            className="h-[400px] w-full object-cover object-top"
                        />
                        <div className="absolute inset-0 grid h-full w-full 
                        place-items-center bg-black/50 
                        opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="w-3/4 text-center md:w-2/4">
                                <Typography
                                    variant="h1"
                                    color="white"
                                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                                >
                                    Floppy Birds
                                </Typography>
                            </div>
                            <div className="flex justify-center gap-2">
                                <Button size="lg" color="red"
                                    onClick={() => handleNavigate("Floppy-Bird")}>
                                    PLAY GAMES
                                </Button>
                            </div>
                        </div>
                    </div>


                    <div className="relative h-full w-[100vw] group">
                        <img
                            src={Img2048}
                            className="h-[400px] w-full object-cover"
                        />
                        <div className="absolute inset-0 grid h-full w-full 
                        place-items-center bg-black/50 
                        opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="w-3/4 text-center md:w-2/4">
                                <Typography
                                    variant="h1"
                                    color="white"
                                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                                >
                                    2048
                                </Typography>
                            </div>
                            <div className="flex justify-center gap-2">
                                <Button size="lg" color="red"
                                    onClick={() => handleNavigate("2048-games")}>
                                    PLAY GAMES
                                </Button>
                            </div>
                        </div>
                    </div>


                    <div className="relative h-full w-[100vw] group">
                        <img
                            src={memoGameImg}
                            className="h-[400px] w-full object-cover object"
                        />
                        <div className="absolute inset-0 grid h-full w-full 
                        place-items-center bg-black/50 
                        opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="w-3/4 text-center md:w-2/4">
                                <Typography
                                    variant="h1"
                                    color="white"
                                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                                >
                                    Fruits Monster
                                </Typography>
                            </div>
                            <div className="flex justify-center gap-2">
                                <Button size="lg" color="red"
                                    onClick={() => handleNavigate("Memo-game")}>
                                    PLAY GAMES
                                </Button>
                            </div>
                        </div>
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
                                        className="w-full h-[200px] object-cover shadow-xl
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