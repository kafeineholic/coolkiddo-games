import React from 'react';
import './styles/2048styles.css';

const TwoZeroFourEightGames = () => {
  return (
    <div id="game-wrapper">
      {/* Game Container */}
      <div id="game-container">
        <div id="grid-container"></div>
      </div>

      {/* Game Over Section */}
      <div id="game-over">
        <h1>Game Over</h1>
        <button id="tryagain">Try Again</button>
      </div>

      {/* Game Info Section */}
      <div className="game-info">
        <h1>2048 Game</h1>
        <div id="game-message" className="game-message">
          <p id="game-time">Time: 00:00</p>
          <p id="game-score">Score: 0</p>
        </div>
        <button id="new-game">New Game</button>
        <button id="pause-resume">Pause</button>
      </div>
    </div>
  );
};

export default TwoZeroFourEightGames;
