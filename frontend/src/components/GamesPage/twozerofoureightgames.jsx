import React from 'react'

const twozerofoureightgames = () => {
  return (
    <>
      <div id="game-container">
        <div id="grid-container" />
      </div>
      <div id="game-over">
        <h1>Game Over</h1>
        <button id="tryagain">Try Again</button>
      </div>
      <div className="game-info">
        <h1>2048 Game</h1>
        <div id="game-message" className="game-message">
          <p id="game-time">Time: 00:00</p>
          <p id="game-score">Score: 0</p>
        </div>
        <button id="new-game">New Game</button>
        <button id="pause-resume">Pause</button>
      </div>
    </>
  )
}

export default twozerofoureightgames