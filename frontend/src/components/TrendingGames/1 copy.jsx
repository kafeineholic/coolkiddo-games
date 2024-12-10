import React, { useEffect, useState } from 'react';
import { images } from ".//src/assets";

const ColorMemo = () => {
    const BLANK_CARD = "https://progitek.no/privat/bp/wp-content/uploads/2021/09/pexels-pixabay-235985-scaled.jpg";
    const [imagesArray, setImagesArray] = useState([]);
    const [cardsChosen, setCardsChosen] = useState([]);
    const [cardsChosenIds, setCardsChosenIds] = useState([]);
    const [points, setPoints] = useState(0);
    const [openCards, setOpenCards] = useState([]);

    function createCardBoard() {
        const imagesGenerated = [...images, ...images]; // Double the images
        const shuffledArray = shuffleArray(imagesGenerated);
        setImagesArray(shuffledArray);
    }

    function flipImage(image, index) {
        if (cardsChosenIds.includes(index)) {
            return;
        }

        setCardsChosen(cardsChosen => [...cardsChosen, image]);
        setCardsChosenIds(cardsChosenIds => [...cardsChosenIds, index]);

        if (cardsChosen.length === 1) {
            if (cardsChosen[0] === image) {
                setPoints(points => points + 2);
                setOpenCards(openCards => [...openCards, image]);
            }

            setTimeout(() => {
                setCardsChosen([]);
                setCardsChosenIds([]);
            }, 700);
        }
    }

    function isCardChosen(image, index) {
        return cardsChosenIds.includes(index) || openCards.includes(image);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startOver() {
        setCardsChosenIds([]);
        setCardsChosen([]);
        setPoints(0);
        setOpenCards([]);
    }

    useEffect(() => {
        createCardBoard();
    }, []);

    return (
        <div>
            <h2>MemoryGame</h2>
            <h3>Points: {points}</h3>
            <button onClick={startOver}>Start Over</button>
            <div className="row no-gutters">
                {imagesArray.map((image, index) => (
                    <div className="col-4 col-lg-2" key={index} onClick={() => flipImage(image, index)}>
                        <img src={isCardChosen(image, index) ? image : BLANK_CARD} alt="" className="img-fluid img-fixed" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorMemo;
