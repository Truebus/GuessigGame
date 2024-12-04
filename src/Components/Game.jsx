import { useState } from "react";
import ReactConfetti from 'react-confetti';

export const Game = () => {
    const [saveValue, setSaveValue] = useState('');
    const [randomValue, setRandomValue] = useState(Math.floor(Math.random() * 10));
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [player1Input, setPlayer1Input] = useState('');
    const [player2Input, setPlayer2Input] = useState('');
    const [currentValue, setCurrentValue] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [turnLeft, setTurnLeft] = useState(5);

    const restartGame = () => {
        setPlayer1Score(0);
        setPlayer2Score(0);
        setTurnLeft(5);
        setGameOver(false);
        setCurrentValue(1); // Start with Player 1
        setRandomValue(Math.floor(Math.random() * 10)); // Start with a new random number
    };

    const handleRandom = () => {
        setRandomValue(Math.floor(Math.random() * 10)); // Generate a new random number
    };

    const handleValue = (e) => {
        setSaveValue(e.target.value); // Update input value
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentValue === 1) {
            setPlayer1Input(saveValue); // Store Player 1's input
        } else {
            setPlayer2Input(saveValue); // Store Player 2's input
        }
        setSaveValue(''); // Clear the input field
    };

    const handleLogic = () => {
        if (currentValue === 1) {
            if (parseInt(player1Input, 10) === randomValue) {
                setPlayer1Score(prevScore => prevScore + 1); // Increase Player 1's score if correct
            }
            setPlayer1Input(''); // Clear Player 1's input
            setCurrentValue(2); // Switch to Player 2
        } else if (currentValue === 2) {
            if (parseInt(player2Input, 10) === randomValue) {
                setPlayer2Score(prevScore => prevScore + 1); // Increase Player 2's score if correct
            }
            setPlayer2Input(''); // Clear Player 2's input
            setCurrentValue(1); // Switch back to Player 1
            setTurnLeft(prevTurn => prevTurn - 1); // Decrease remaining turns

            if (turnLeft - 1 === 0) {
                setGameOver(true); // End the game after 5 turns
            }
            handleRandom(); // Generate a new random number after each turn
        }
    };

    const getWinner = () => {
        if (player1Score > player2Score) {
            return "Player 1 Wins!";
        } else if (player2Score > player1Score) {
            return "Player 2 Wins!";
        } else {
            return "It's a Tie!";
        }
    };

    return (
        <div>
            <div className="m-auto mt-[35px] h-[450px] w-[350px] rounded-3xl border-2 border-black bg-gradient-to-tr from-pink-200 to-yellow-200 shadow-lg shadow-gray-400">
                <div className="p-[10px] text-center">
                    <h1 className="text-center font-bold font-serif text-xl text-blue-800 underline mb-[10px]">Guess Number</h1>
                    <h1 className="font-semibold">Let's Play!!</h1>
                </div>

                <div>
                    <h2 className="font-serif font-semibold text-xl p-2" onClick={handleLogic}>Random Number:- {randomValue}</h2>

                    <form className="p-1 flex items-center justify-center gap-x-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Enter Number"
                            className="outline-none border-2 border-orange-400 rounded-xl p-2 w-[300px]"
                            value={saveValue}
                            onChange={handleValue}
                        />
                        <button type="submit" onClick={handleLogic} className="bg-gradient-to-tr from-yellow-400 to-orange-400 p-2 rounded-xl font-bold font-serif">
                            Submit
                        </button>
                    </form>

                    <div className="text-center mt-[20px] flex flex-col gap-y-3 font-bold font-serif text-lg">
                        <p> Player 1 Score: {player1Score}</p>
                        <p>Player 2 Score: {player2Score}</p>
                        <h2>Left Moves: {turnLeft}</h2>
                    </div>

                    {!gameOver ? (
                        <div className="p-[10px] font-serif font-semibold">
                            <h1 className="relative -top-[140px]">It's Player {currentValue}'s Turn</h1>
                        </div>
                    ) : (
                        <div className="text-center font-serif font-bold">
                            <h2 className="mt-[10px] text-xl">{getWinner()}</h2>
                            <ReactConfetti
                                width={window.innerWidth}
                                height={window.innerHeight}
                                numberOfPieces={200} // Increase confetti pieces
                                colors={["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#8a2be2"]} // Custom colors
                                gravity={0.1} // Adjust gravity for slower fall
                                initialVelocityY={1} // Adjust vertical velocity for faster movement
                                wind={0.08} // Adjust wind speed
                                recycle={false} // Do not recycle, stop after finishing
                            />
                        </div>
                    )}
                    <div className="flex justify-end p-[10px]">
                        <button type="button" onClick={restartGame}
                            className="p-1 bg-gradient-to-tr from-sky-200 to-amber-400 font-serif font-semibold">Restart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
