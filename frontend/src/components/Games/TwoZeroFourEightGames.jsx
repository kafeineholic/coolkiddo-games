import React, { useState, useEffect, useRef } from 'react';
import Board from "../TwoZeroFourEightGames/Board";
import {
  initializeGrid,
  moveTiles,
  isGameOver,
  hasReached2048,
} from "../TwoZeroFourEightGames/gameLogic";
import { IoMdRefresh } from "react-icons/io";
import GameOverPopup from "../TwoZeroFourEightGames/GameOverPopup";
import { assets } from "../../assets/assets"; // import assets for the navbar
import { useNavigate } from 'react-router-dom'; // import useNavigate for navigation

// Define the Navbar component here
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center py-2 px-4 sm:py-3 sm:px-16 absolute top-0 bg-[#40826d] bg-opacity-75 z-10">
    <img
      onClick={() => navigate('/')}
      src={assets.game} // use assets for logo
      alt="Game Logo"
      className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer" // Adjusted size
    />
    <h1 className="text-xl sm:text-2xl text-white font-bold">2048</h1>
  </div>
  
  );
};

const TwoZeroFourEightGames = () => {
  const [grid, setGrid] = useState(initializeGrid());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    () => localStorage.getItem("bestScore") || 0
  );
  const [newTiles, setNewTiles] = useState([]);
  const [mergedTiles, setMergedTiles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleKeyDown = (e) => {
    const { newGrid, newScore, newTiles, mergedTiles } = moveTiles(
      grid,
      e.key.replace("Arrow", "").toLowerCase()
    );

    if (newGrid) {
      setGrid(newGrid);
      setScore((prevScore) => prevScore + newScore);
      setNewTiles(newTiles);
      setMergedTiles(mergedTiles);
      if (isGameOver(newGrid)) {
        setGameOver(true);
      }
      if (hasReached2048(newGrid)) {
        setGameWon(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grid]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score);
    }
  }, [score, bestScore]);

  const handleNewGame = () => {
    setGrid(initializeGrid());
    setScore(0);
    setNewTiles([]);
    setMergedTiles([]);
    setGameOver(false);
    setGameWon(false);
    setGameStarted(true);
  };

  const handleSwipe = (direction) => {
    const { newGrid, newScore, newTiles, mergedTiles } = moveTiles(
      grid,
      direction
    );

    if (newGrid) {
      setGrid(newGrid);
      setScore((prevScore) => prevScore + newScore);
      setNewTiles(newTiles);
      setMergedTiles(mergedTiles);
      if (isGameOver(newGrid)) {
        setGameOver(true);
      }
    }
  };

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!touchStartX.current || !touchStartY.current) {
        return;
      }

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;

      const deltaX = touchStartX.current - touchEndX;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          handleSwipe("left");
        } else {
          handleSwipe("right");
        }
      } else {
        if (deltaY > 0) {
          handleSwipe("up");
        } else {
          handleSwipe("down");
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [grid]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <Navbar /> {/* Add Navbar here */}
      {!gameStarted ? (
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-lg">
            2048
          </h1>
          <button
            className="text-2xl font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-white py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setGameStarted(true)}
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-lg">
            2048
          </h1>
          <div className="flex mb-4 space-x-4 items-center justify-between">
            <div className="text-xl font-semibold bg-gray-800 rounded-md text-white py-2 px-3 shadow-lg">
              Score: {score}
            </div>
            <div className="text-xl font-semibold bg-gray-800 rounded-md text-white py-2 px-3 shadow-lg">
              Best: {bestScore}
            </div>
            <button
              className="text-2xl font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-white py-2 px-3 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleNewGame}
            >
              <IoMdRefresh />
            </button>
          </div>
          <Board grid={grid} newTiles={newTiles} mergedTiles={mergedTiles} />
          {gameOver && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-800 px-8 py-4 rounded shadow-lg flex flex-col items-center">
                <h2 className="text-4xl font-bold mb-4 text-white">
                  Game Over
                </h2>
                <button
                  className="mt-2 p-2 bg-gray-800 text-white rounded transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleNewGame}
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
          {gameWon && <GameOverPopup onNewGame={handleNewGame} />}
        </>
      )}
    </div>
  );
};

export default TwoZeroFourEightGames;
