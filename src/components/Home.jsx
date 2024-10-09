import React, { useState } from 'react';

const Home = ({ startGame }) => {
  const [playerX, setPlayerX] = useState('');
  const [player0, setPlayer0] = useState('');

  const handleStartGame = () => {
    if (playerX && player0) {
      startGame(playerX, player0);
    } else {
      alert("Please enter names for both players.");
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500'>
      <h1 className='text-6xl font-bold text-white mb-8'>Tic Tac Toe</h1>
      <p className='text-xl text-white mb-4'>The classic game of strategy!</p>
      <input
        type="text"
        placeholder="Player X's Name"
        value={playerX}
        onChange={(e) => setPlayerX(e.target.value)}
        className='bg-white font-medium text-blue-500 px-4 py-2 rounded-lg mb-4'
      />
      <input
        type="text"
        placeholder="Player O's Name"
        value={player0}
        onChange={(e) => setPlayer0(e.target.value)}
        className='bg-white font-medium text-blue-500 px-4 py-2 rounded-lg mb-4'
      />
      <button
        onClick={handleStartGame}
        className='bg-white text-blue-500 px-6 py-3 rounded-lg text-xl hover:bg-blue-200 hover:text-blue-800 font-bold transition duration-300'
      >
        Start Game
      </button>
      <p className='text-white mt-6'>Instructions:</p>
      <ul className='list-disc text-white pl-6'>
        <li>Take turns to place your marker (X or O) on the grid.</li>
        <li>Get three in a row to win!</li>
        <li>Click the Restart button to play again.</li>
      </ul>
    </div>
  );
};

export default Home;