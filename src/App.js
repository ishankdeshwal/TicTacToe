import './App.css';
import { useEffect, useState } from 'react';
import Square from './components/Square';
import { Patterns } from './components/patterns';
import Home from './components/Home';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [res, setRes] = useState({ winner: "none", state: "none" });
  const [gameStarted, setGameStarted] = useState(false);
  const [playerXName, setPlayerXName] = useState("");
  const [player0Name, setPlayer0Name] = useState("");

  useEffect(() => {
    checkWin();
    if (res.state === "none") { 
      tied();
    }
    if (res.state === "none") {
      setPlayer(player === "X" ? "O" : "X");
    }
  }, [board]);

  useEffect(() => {
    if (res.state !== "none") {
      const winnerName = res.winner === "No One" ? "It's a Tie!" : res.winner;
      const message = `Game Finished! Winning Player: ${winnerName=== "X" ? playerXName : player0Name}. Do you want to restart?`;
      const restartConfirmed = window.confirm(message);
      
      if (restartConfirmed) {
        restart();
      }
    }
}, [res]);


  const startGame = (nameX, name0) => {
    setPlayerXName(nameX);
    setPlayer0Name(name0);
    setGameStarted(true);
    restart();
  };

  const chooseSquare = (square) => {
    if (res.state === "none") { 
      setBoard(board.map((val, idx) => {
        if (idx === square && val === "") return player;
        else return val;
      }));
    }
  };

  const tied = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });
    if (filled && res.state === "none") {
      setRes({ winner: "No One", state: "Tie" });
    }
  };


  const restart = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
    setRes({ winner: "none", state: "none" });
  };

  const prevPage = () => {
    setGameStarted(false);
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return;
      let foundWinner = true;
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinner = false;
        }
      });
      if (foundWinner) {
        setRes({ winner: player === "X" ? playerXName : player0Name, state: "won" });
      }
    });
  };

  return (
    <div>
      {
        !gameStarted ? (
          <Home startGame={startGame} />
        ) : (
          <div className='w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
            <h1 className='text-5xl text-lime-100 mb-10'>Tic Tac Toe</h1>
            <h2 className="text-xl mb-5 font-bold">
              {res.state === "none" ? `Current Turn: Player ${player === "X" ? playerXName : player0Name}` : `Game Finished`}
            </h2>
            <div className='w-96 h-96 bg-gray-600 flex flex-col rounded-lg shadow-lg'>
              <div className='flex basis-1/3 flex-row border-black border-2'>
                <Square val={board[0]} chooseSquare={() => { chooseSquare(0); }} />
                <Square val={board[1]} chooseSquare={() => { chooseSquare(1); }} />
                <Square val={board[2]} chooseSquare={() => { chooseSquare(2); }} />
              </div>
              <div className='flex basis-1/3 flex-row border-black border-2'>
                <Square val={board[3]} chooseSquare={() => { chooseSquare(3); }} />
                <Square val={board[4]} chooseSquare={() => { chooseSquare(4); }} />
                <Square val={board[5]} chooseSquare={() => { chooseSquare(5); }} />
              </div>
              <div className='flex basis-1/3 flex-row border-black border-2'>
                <Square val={board[6]} chooseSquare={() => { chooseSquare(6); }} />
                <Square val={board[7]} chooseSquare={() => { chooseSquare(7); }} />
                <Square val={board[8]} chooseSquare={() => { chooseSquare(8); }} />
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <button
                onClick={restart}
                className='mt-20 text-white bg-red-400 px-16 py-3 rounded-2xl text-xl hover:bg-red-700 transition duration-300'
              >
                Restart
              </button>
              <button
                onClick={prevPage}
                className='mt-20 text-white bg-red-400 px-8 py-3 rounded-2xl text-xl hover:bg-red-700 transition duration-300'
              >
                Change Names
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;