import { useState } from "react";
import reactLogo from "./assets/react.svg";
import tailwindLogo from "./assets/tailwind.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let classNameX;
  let classNameO;
  let winnerBox;
  let deskrip;
  if (winner && winner != "draw") {
    classNameO = "o inactive";
    classNameX = "x inactive";
    winnerBox = "show";
    deskrip = "Winner Is " + winner;
    if (deskrip == "Winner Is Draw") {
      classNameO = "o inactive";
      classNameX = "x inactive";
      winnerBox = "show";
      deskrip = "Draw";
    }
  } else if (xIsNext) {
    classNameO = "o inactive";
    classNameX = "x";
    winnerBox = "hidden";
  } else {
    classNameX = "x inactive";
    classNameO = "o";
    winnerBox = "hidden";
  }

  function undoClick() {}

  return (
    <>
      <div className="container">
        <h1 className="font-bold text-5xl mb-6 text-black">Tic Tac Toe</h1>
        <div className="status">
          <h1 className={classNameX}>X</h1>
          <button className="btn-undo" onClick={undoClick}>
            Undo
          </button>
          <h1 className={classNameO}>O</h1>
        </div>
        <div className="board">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          <h1 className={winnerBox}>{deskrip}</h1>
        </div>
        <span className="text-sm text-gray-700 mb-6">
          Note: Undo button is not working
        </span>
        <p className="mb-3 text-center text-xs font-medium text-gray-500">
          Made from <span className="text-pink-500">❤️</span> by{" "}
          <a
            className="font-bold text-gray-600"
            target="_blank"
            href="https://linktr.ee/oortsky"
          >
            BayuAprio.
          </a>
        </p>
        <p className="mb-3 text-center text-xs flex flex-wrap font-medium items-center justify-center gap-x-2 text-gray-500">
          Develop Using
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo vite" alt="Vite logo" />
          </a>
          <a href="https://tailwindcss.com/" target="_blank">
            <img
              src={tailwindLogo}
              className="logo tailwind"
              alt="Tailwind logo"
            />
          </a>
        </p>
        <p className="text-center text-xs font-medium text-gray-500">
          {" "}
          <span className="font-bold text-red-600">Info</span>: Coded using{" "}
          <span className="font-bold text-green-400">🤖 Android</span>
        </p>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  for (let j = 0; j < squares.length; j++) {
    if (squares[j] == null) {
      return null;
    }
  }
  return "Draw";
}
