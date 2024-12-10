import React, { useState, useEffect, useRef } from 'react';

const WhackAMole = () => {
    const [score, setScore] = useState(0);
    const [misses, setMisses] = useState(0);
    const [gamePaused, setGamePaused] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [currentMoleIndex, setCurrentMoleIndex] = useState(null);
    const moleIntervalRef = useRef(null);

    const moles = Array.from({ length: 9 }, (_, index) => ({
        id: index,
        isVisible: false,
        isRed: false,
    }));

    const handleMoleClick = (mole, index) => {
        if (gamePaused) return;

        if (mole.isRed) {
            endGame();
        } else if (index === currentMoleIndex) {
            setScore((prevScore) => prevScore + 1);
        } else {
            setMisses((prevMisses) => prevMisses + 1);
        }
    };

    const showRandomMole = () => {
        if (misses >= 5 || gamePaused) return;

        setCurrentMoleIndex((prevIndex) => {
            const newIndex = Math.floor(Math.random() * moles.length);
            return newIndex !== prevIndex ? newIndex : (newIndex + 1) % moles.length;
        });
    };

    const startGame = () => {
        moleIntervalRef.current = setInterval(showRandomMole, 1200);
    };

    const endGame = () => {
        clearInterval(moleIntervalRef.current);
        setGameOver(true);
    };

    const restartGame = () => {
        setScore(0);
        setMisses(0);
        setGameOver(false);
        setGamePaused(false);
        startGame();
    };

    const pauseGame = () => {
        setGamePaused(true);
        clearInterval(moleIntervalRef.current);
    };

    const resumeGame = () => {
        setGamePaused(false);
        startGame();
    };

    useEffect(() => {
        startGame();
        return () => clearInterval(moleIntervalRef.current);
    }, []);

    // Inline styles
    const styles = {
        container: {
            fontFamily: "'Finger Paint', cursive",
            backgroundColor: '#e6c590',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            textAlign: 'center',
            color: '#6a2e16',
        },
        heading: {
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#6a2e16',
        },
        score: {
            fontSize: '24px',
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#6a2e16',
        },
        gameOver: {
            fontSize: '30px',
            fontWeight: 'bold',
            color: 'red',
            display: gameOver ? 'block' : 'none',
            marginTop: '20px',
        },
        buttonContainer: {
            display: 'flex',
            gap: '20px',
            marginTop: '20px',
            justifyContent: 'center',
        },
        button: {
            padding: '12px 24px',
            fontSize: '18px',
            backgroundColor: '#cd812e',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease',
            fontFamily: "'Finger Paint', cursive",
        },
        buttonHover: {
            backgroundColor: '#6a2e16',
        },
        gameBoard: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 150px)',
            gridTemplateRows: 'repeat(3, 150px)',
            gap: '20px',
            marginTop: '20px',
            justifyContent: 'center',
        },
        hole: {
            width: '150px',
            height: '150px',
            backgroundColor: '#8e6e53',
            borderRadius: '50%',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s ease-in-out',
        },
        mole: {
            width: '60px',
            height: '60px',
            backgroundColor: '#2e8b57',
            borderRadius: '50%',
            position: 'absolute',
            bottom: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            transition: 'bottom 1.5s ease-in-out',
            visibility: 'hidden',
        },
        moleVisible: {
            visibility: 'visible',
            bottom: '0',
        },
        moleHit: {
            backgroundColor: '#FFEB3B',
            transform: 'scale(0.9)',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
        },
        moleRed: {
            backgroundColor: '#d9534f',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Whack-a-Mole Game</h1>
            <div style={styles.score}>Score: {score}</div>
            <div style={styles.gameOver}>Game Over!</div>

            <div style={styles.buttonContainer}>
                <button
                    style={{
                        ...styles.button,
                        display: gamePaused ? 'none' : 'inline-block',  // แสดงปุ่ม Pause เมื่อเกมยังไม่หยุด
                    }}
                    onClick={pauseGame}
                >
                    Pause Game
                </button>

                <button
                    style={{
                        ...styles.button,
                        display: gamePaused ? 'inline-block' : 'none',  // แสดงปุ่ม Resume เมื่อเกมหยุด
                    }}
                    onClick={resumeGame}
                >
                    Resume Game
                </button>
                <button style={styles.button} onClick={restartGame}>
                    Restart Game
                </button>
            </div>

            <div style={styles.gameBoard}>
                {moles.map((mole, index) => (
                    <div
                        key={mole.id}
                        style={styles.hole}
                        onClick={() => handleMoleClick(mole, index)}
                    >
                        <div
                            style={{
                                ...styles.mole,
                                ...(index === currentMoleIndex ? styles.moleVisible : {}),
                                ...(mole.isRed ? styles.moleRed : {}),
                            }}
                        ></div>
                        <img
                            src="https://www.iconsdb.com/icons/preview/green/mole-xxl.png"
                            alt="mole"
                            className="mole-img"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhackAMole;