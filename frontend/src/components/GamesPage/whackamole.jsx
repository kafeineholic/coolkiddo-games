import React from 'react'

const whackamole = () => {
  return (
    <>
      <title>Whack-a-Mole Game</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n        }\n\n        body {\n            font-family: 'Finger Paint', cursive;\n            background-color: #e6c590;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            height: 100vh;\n            flex-direction: column;\n            text-align: center;\n            color: #6a2e16;\n        }\n\n        h1 {\n            font-size: 48px;\n            font-weight: bold;\n            margin-bottom: 20px;\n            color: #6a2e16;\n        }\n\n        #score {\n            font-size: 24px;\n            margin-bottom: 20px;\n            font-weight: bold;\n            color: #6a2e16;\n        }\n\n        #gameOver {\n            font-size: 30px;\n            font-weight: bold;\n            color: red;\n            display: none;\n            margin-top: 20px;\n        }\n\n        .button-container {\n            display: flex;\n            gap: 20px;\n            margin-top: 20px;\n            justify-content: center;\n        }\n\n        #restartButton, #pauseButton, #resumeButton {\n    padding: 12px 24px;\n    font-size: 18px;\n    background-color: #cd812e;\n    color: white;\n    border: none;\n    cursor: pointer;\n    border-radius: 8px;\n    transition: background-color 0.3s ease;\n    font-family: 'Finger Paint', cursive; /* Added font-family here */\n}\n\n        #pauseButton {\n            background-color: #8e6e53;\n        }\n\n        #resumeButton {\n            background-color: #a4c639;\n            display: none;\n        }\n\n        #restartButton:hover, #pauseButton:hover, #resumeButton:hover {\n            background-color: #6a2e16;\n        }\n\n        .game-board {\n            display: grid;\n            grid-template-columns: repeat(3, 150px);\n            grid-template-rows: repeat(3, 150px);\n            gap: 20px;\n            margin-top: 20px;\n            justify-content: center;\n        }\n\n        .hole {\n            width: 150px;\n            height: 150px;\n            background-color: #8e6e53;\n            border-radius: 50%;\n            position: relative;\n            overflow: hidden;\n            cursor: pointer;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n            transition: transform 0.2s ease-in-out;\n        }\n\n        .hole:hover {\n            transform: scale(1.05);\n        }\n\n        .mole {\n            width: 60px;\n            height: 60px;\n            background-color: #2e8b57;\n            border-radius: 50%;\n            position: absolute;\n            bottom: -60px;\n            left: 50%;\n            transform: translateX(-50%);\n            transition: bottom 1.5s ease-in-out; /* Adjusted transition for smoother effect */\n            visibility: hidden;\n        }\n\n        .mole.visible {\n            visibility: visible;\n            bottom: 0;\n        }\n\n        .mole.hit {\n            background-color: #FFEB3B;\n            transform: scale(0.9);\n            transition: background-color 0.3s ease, transform 0.3s ease;\n        }\n\n        .mole.red {\n            background-color: #d9534f;\n        }\n\n        .hole img {\n            width: 50px;\n            height: 50px;\n            position: absolute;\n            left: 50%;\n            top: 50%;\n            transform: translate(-50%, -50%);\n        }\n\n        .hole img.mole-img {\n            width: 30px;\n            height: 30px;\n            transition: opacity 0.3s ease, transform 0.3s ease;\n            opacity: 0;\n        }\n\n        .hole:hover img.mole-img {\n            opacity: 0;\n            transform: translate(-50%, -50%) scale(1.2); \n            transition: opacity 0.3s ease, transform 0.3s ease; \n        }\n    "
        }}
      />
      <h1>Whack-a-Mole Game</h1>
      <div id="score">Score: 0</div>
      <div id="gameOver">Game Over!</div>
      <div className="button-container">
        <button id="pauseButton" onclick="pauseGame()">
          Pause Game
        </button>
        <button id="resumeButton" onclick="resumeGame()">
          Resume Game
        </button>
        <button id="restartButton" onclick="restartGame()">
          Restart Game
        </button>
      </div>
      <div className="game-board">
        <div className="hole">
          <div className="mole" data-index={0} />
          <img
            src="https://www.iconsdb.com/icons/preview/green/mole-xxl.png"
            className="mole-img"
          />
        </div>
        <div className="hole">
          <div className="mole" data-index={1} />
          <img
            src="https://www.iconsdb.com/icons/preview/green/mole-xxl.png"
            className="mole-img"
          />
        </div>
        <div className="hole">
          <div className="mole" data-index={2} />
          <img
            src="https://www.iconsdb.com/icons/preview/green/mole-xxl.png"
            className="mole-img"
          />
        </div>
        <div className="hole">
          <div className="mole" data-index={3} />
          <img
            src="https://www.iconsdb.com/icons/preview/green/mole-xxl.png"
            className="mole-img"
          />
        </div>
        <div className="hole">
          <div className="mole" data-index={4} />
          <img
            src="https://www.iconsdb.com/icons/preview/green/mole-xxl.png"
            className="mole-img"
          />
        </div>
        <div className="hole">
          <div className="mole" data-index={5} />
          <img
            src="https://www.iconsdb.com/icons/preview/green/mole-xxl.png"
            className="mole-img"
          />
        </div>
        <div className="hole">
          <div className="mole" data-index={6} />
          <img
            src="https://www.iconsdb.com/icons/preview/green/mole-xxl.png"
            className="mole-img"
          />
        </div>
        <div className="hole">
          <div className="mole" data-index={7} />
          <img
            src="https://www.iconsdb.com/icons/preview/green/mole-xxl.png"
            className="mole-img"
          />
        </div>
        <div className="hole">
          <div className="mole" data-index={8} />
          <img
            src="https://www.iconsdb.com/icons/preview/green/mole-xxl.png"
            className="mole-img"
          />
        </div>
      </div>
    </>
  );
};

export default whackamole;