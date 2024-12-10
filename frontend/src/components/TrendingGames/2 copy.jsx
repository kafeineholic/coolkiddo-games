// import React, { useState, useEffect, useRef } from "react";

// const TwoZeroFourEightGames = () => {
//   const styles = {
//     body: {
//       background: "#121212",
//       color: "#fff",
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "100vh",
//       margin: 0,
//       fontFamily: "Arial, Helvetica, sans-serif",
//       overflow: "hidden",
//     },
//     gameMessage: {
//       border: "none",
//       outline: "none",
//       display: "flex",
//       flexDirection: "row",
//       width: "100%",
//       marginBottom: "15px",
//       height: "50px",
//       justifyContent: "space-between",
//       alignItems: "center",
//       paddingBottom: "15px",
//       borderBottom: "1px solid #ccc",
//     },
//     gameContainer: {
//       display: "inline-block",
//       background: "#1e1e1e",
//       padding: "15px",
//       borderRadius: "10px",
//       marginTop: "20px",
//       position: "relative",
//     },
//     gameInfo: {
//       color: "#444",
//       backgroundColor: "#fff",
//       padding: "15px",
//       border: "none",
//       display: "flex",
//       flexDirection: "column",
//       width: "300px",
//       height: "50%",
//       marginLeft: "50px",
//       justifyContent: "start",
//       alignItems: "center",
//       borderRadius: "10px",
//       boxShadow: "rgba(0, 0, 0, 0.233) 0px 5px 20px 1px",
//     },
//     gameInfoButton: {
//       borderRadius: "5px",
//       border: "none",
//       outline: "none",
//       margin: "10px",
//       width: "90%",
//       height: "40px",
//       background: "#692c14",
//       color: "#fff",
//       fontWeight: 600,
//       letterSpacing: "1px",
//       fontSize: "17px",
//       transition: "background-color 0.6s ease",
//     },
//     gameInfoButtonHover: {
//       backgroundColor: "#062d3d",
//     },
//     gameInfoH1: {
//       fontSize: "25px",
//       fontWeight: 6500,
//       paddingBottom: "20px",
//     },
//     gameScore: {
//       border: "1px solid #444",
//       padding: "10px",
//       borderRadius: "5px",
//     },
//     gameTime: {
//       border: "1px solid #444",
//       padding: "10px",
//       borderRadius: "5px",
//     },
//     gridContainer: {
//       display: "grid",
//       gridTemplateColumns: "repeat(4, 100px)",
//       gridTemplateRows: "repeat(4, 100px)",
//       gap: "10px",
//     },
//     tile: {
//       width: "100px",
//       height: "100px",
//       background: "#2c2c2c",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       fontSize: "24px",
//       fontWeight: "bold",
//       borderRadius: "5px",
//     },
//     tile2: {
//       background: "#ffecd1",
//       color: "#000",
//     },
//     tile4: {
//       background: "#e7c593",
//       color: "#000",
//     },
//     tile8: {
//       background: "#c0ad81",
//       color: "#000",
//     },
//     tile16: {
//       background: "#a39964",
//       color: "#000",
//     },
//     tile32: {
//       background: "#635a34",
//       color: "#000",
//     },
//     tile64: {
//       background: "#d5b16c",
//       color: "#000",
//     },
//     tile128: {
//       background: "#db872c",
//       color: "#000",
//     },
//     tile256: {
//       background: "#f58549",
//       color: "#000",
//     },
//     tile512: {
//       background: "#4a2c1c",
//       color: "#000",
//     },
//     tile1024: {
//       background: "#885f42",
//       color: "#000",
//     },
//     tile2048: {
//       background: "#6da5a6",
//       color: "#000",
//     },
//     gameOver: {
//       display: "none",
//       width: "460px",
//       height: "150px",
//       backgroundColor: "#f9f8f8",
//       zIndex: 100,
//       position: "fixed",
//       top: "35%",
//       left: "35%",
//       borderRadius: "15px",
//       boxShadow: "rgba(0, 0, 0, 0.233) 0px 5px 20px 1px",
//       animation: "bounceIn 1s",
//     },
//     gameOverH1: {
//       marginTop: "10px",
//       color: "#444",
//       textAlign: "center",
//       fontSize: "40px",
//     },
//     gameOverButton: {
//       marginTop: "20px",
//       padding: "10px 20px",
//       backgroundColor: "#0a59c8",
//       fontSize: "19px",
//       cursor: "pointer",
//       border: "none",
//       color: "#fff",
//       borderRadius: "10px",
//       transition: "background-color 0.6s ease",
//     },
//     gameOverButtonHover: {
//       backgroundColor: "#164863",
//     },
//   };

//   const createEmptyGrid = () => {
//     return [
//       [0, 0, 0, 0],
//       [0, 0, 0, 0],
//       [0, 0, 0, 0],
//       [0, 0, 0, 0],
//     ];
//   };

//   const [grid, setGrid] = useState(createEmptyGrid());
//   const [score, setScore] = useState(0);
//   const [time, setTime] = useState(0);
//   const [gameStarted, setGameStarted] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [timerId, setTimerId] = useState(null);

//   const scoreRef = useRef(null);
//   const timeRef = useRef(null);
//   const pauseButtonRef = useRef(null);

//   useEffect(() => {
//     if (gameStarted && !isPaused) {
//       const interval = setInterval(() => {
//         setTime((prevTime) => prevTime + 1);
//       }, 1000);
//       setTimerId(interval);
//       return () => clearInterval(interval); // Cleanup interval on component unmount or game pause
//     }
//   }, [gameStarted, isPaused]);

//   const initGame = () => {
//     setGrid(createEmptyGrid());
//     setScore(0);
//     setTime(0);
//     setGameStarted(false);
//     addRandomTile();
//     addRandomTile();
//     hideGameOverMessage();
//   };

//   const addRandomTile = () => {
//     let emptyTiles = [];
//     for (let i = 0; i < 4; i++) {
//       for (let j = 0; j < 4; j++) {
//         if (grid[i][j] === 0) {
//           emptyTiles.push({ i, j });
//         }
//       }
//     }
//     if (emptyTiles.length) {
//       let { i, j } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
//       let newGrid = [...grid];
//       newGrid[i][j] = Math.random() > 0.9 ? 4 : 2;
//       setGrid(newGrid);
//     }
//   };

//   const drawGrid = () => {
//     if (isGameOver()) {
//       showGameOverMessage();
//       clearInterval(timerId);
//     } else {
//       setGrid([...grid]); // Trigger re-render
//     }
//   };

//   const handleInput = (e) => {
//     if (isGameOver()) {
//       return;
//     }

//     let key = e.key;
//     if (key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight") {
//       if (!gameStarted) {
//         setGameStarted(true);
//       }

//       let oldGrid = JSON.stringify(grid);
//       moveTiles(key);
//       mergeTiles(key);
//       moveTiles(key); // To fill in the gaps after merging
//       if (oldGrid !== JSON.stringify(grid)) {
//         addRandomTile();
//       }
//       drawGrid();
//       updateScore();
//     }
//   };

//   const moveTiles = (direction) => {
//     let isVertical = direction === "ArrowUp" || direction === "ArrowDown";
//     let isForward = direction === "ArrowRight" || direction === "ArrowDown";

//     let newGrid = [...grid];
//     for (let i = 0; i < 4; i++) {
//       let row = [];
//       for (let j = 0; j < 4; j++) {
//         let cell = isVertical ? newGrid[j][i] : newGrid[i][j];
//         if (cell !== 0) row.push(cell);
//       }
//       if (!isForward) row.reverse();
//       for (let j = 0; j < 4; j++) {
//         if (j < row.length) {
//           newGrid[isVertical ? j : i][isVertical ? i : j] = row[j];
//         } else {
//           newGrid[isVertical ? j : i][isVertical ? i : j] = 0;
//         }
//       }
//     }
//     setGrid(newGrid);
//   };

//   const mergeTiles = (direction) => {
//     let newGrid = [...grid];
//     for (let i = 0; i < 4; i++) {
//       for (let j = 0; j < 3; j++) {
//         let cell = direction === "ArrowUp" || direction === "ArrowDown" ? newGrid[j][i] : newGrid[i][j];
//         let nextCell = direction === "ArrowUp" || direction === "ArrowDown" ? newGrid[j + 1][i] : newGrid[i][j + 1];

//         if (cell === nextCell && cell !== 0) {
//           newGrid[j][i] = cell * 2;
//           newGrid[j + 1][i] = 0;
//           setScore((prev) => prev + cell * 2);
//         }
//       }
//     }
//     setGrid(newGrid);
//   };

//   const updateScore = () => {
//     if (scoreRef.current) {
//       scoreRef.current.textContent = `Score: ${score}`;
//     }
//   };

//   const showGameOverMessage = () => {
//     const gameOver = document.getElementById("gameOver");
//     if (gameOver) {
//       gameOver.style.display = "block";
//     }
//   };

//   const hideGameOverMessage = () => {
//     const gameOver = document.getElementById("gameOver");
//     if (gameOver) {
//       gameOver.style.display = "none";
//     }
//   };

//   const isGameOver = () => {
//     // Check for empty spaces
//     for (let i = 0; i < 4; i++) {
//       for (let j = 0; j < 4; j++) {
//         if (grid[i][j] === 0) return false;  // Empty space found
//       }
//     }
  
//     // Check for adjacent matching tiles
//     for (let i = 0; i < 4; i++) {
//       for (let j = 0; j < 4; j++) {
//         if (i < 3 && grid[i][j] === grid[i + 1][j]) return false; // Vertical match
//         if (j < 3 && grid[i][j] === grid[i][j + 1]) return false; // Horizontal match
//       }
//     }
  
//     return true;  // No moves left, game over
//   };
  

//   const pauseGame = () => {
//     setIsPaused(true);
//     clearInterval(timerId);
//     pauseButtonRef.current.textContent = "Resume";
//   };

//   const resumeGame = () => {
//     setIsPaused(false);
//     const interval = setInterval(() => {
//       setTime((prevTime) => prevTime + 1);
//     }, 1000);
//     setTimerId(interval);
//     pauseButtonRef.current.textContent = "Pause";
//   };
  

//   return (
//     <div style={styles.body} onKeyDown={handleInput} tabIndex={0}>
//       <div style={styles.gameContainer}>
//         <div style={styles.gameMessage}>
//           <div style={styles.gameInfo}>
//             <h1 style={styles.gameInfoH1}>2048 Game</h1>
//             <div>
//               <div style={styles.gameScore} ref={scoreRef}>Score: {score}</div>
//               <div style={styles.gameTime} ref={timeRef}>Time: {time}</div>
//             </div>
//             <div>
//               <button
//                 style={styles.gameInfoButton}
//                 ref={pauseButtonRef}
//                 onClick={isPaused ? resumeGame : pauseGame}
//               >
//                 Pause
//               </button>
//               <button
//                 style={styles.gameInfoButton}
//                 onClick={initGame}
//               >
//                 Start New Game
//               </button>
//             </div>
//           </div>
//         </div>
//         <div style={styles.gridContainer}>
//           {grid.map((row, rowIndex) =>
//             row.map((cell, colIndex) => (
//               <div
//                 key={`${rowIndex}-${colIndex}`}
//                 style={{
//                   ...styles.tile,
//                   ...(cell === 2 ? styles.tile2 : {}),
//                   ...(cell === 4 ? styles.tile4 : {}),
//                   ...(cell === 8 ? styles.tile8 : {}),
//                   ...(cell === 16 ? styles.tile16 : {}),
//                   ...(cell === 32 ? styles.tile32 : {}),
//                   ...(cell === 64 ? styles.tile64 : {}),
//                   ...(cell === 128 ? styles.tile128 : {}),
//                   ...(cell === 256 ? styles.tile256 : {}),
//                   ...(cell === 512 ? styles.tile512 : {}),
//                   ...(cell === 1024 ? styles.tile1024 : {}),
//                   ...(cell === 2048 ? styles.tile2048 : {}),
//                 }}
//               >
//                 {cell !== 0 && cell}
//               </div>
//             ))
//           )}
//         </div>
//         <div id="gameOver" style={styles.gameOver}>
//           <h1 style={styles.gameOverH1}>Game Over!</h1>
//           <button style={styles.gameOverButton} onClick={initGame}>Play Again</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TwoZeroFourEightGames;
