// }
// }

// function isCardChosen(image, index) {
//     return cardsChosenIds.includes(index) || openCards.includes(image);
// }

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// function startOver() {
//     setCardsChosenIds([]);
//     setCardsChosen([]);
//     setPoints(0);
//     setOpenCards([]);
// }

// useEffect(() => {
//     createCardBoard();
// }, []);

// return (
//     <div>
//         <h2>MemoryGame</h2>
//         <h3>Points: {points}</h3>
//         <button onClick={startOver}>Start Over</button>
//         <div className="row no-gutters">
//             {imagesArray.map((image, index) => (
//                 <div className="col-4 col-lg-2" key={index} onClick={() => flipImage(image, index)}>
//                     <img src={isCardChosen(image, index) ? image : BLANK_CARD} alt="" className="img-fluid img-fixed" />
//                 </div>
//             ))}
//         </div>
//     </div>
// );
// };

// export default ColorMemo;