import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState<Array<Array<string>>>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0 ? true : false;
  const currentSquares = history[currentMove];

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const handlePlay = (nextSquares: string[]): void => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const moves = history.map((_, move) => {
    let desc = "";
    if (move === 0) {
      desc = "Go to game start";
    } else {
      desc = `Go to move ${move}`;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
interface GameInfo {
  xIsNext: boolean;
  squares: Array<string>;
  onPlay: (nextSquare: string[]) => void;
}
function Board({ xIsNext, squares, onPlay }: GameInfo) {
  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O");
  return (
    <>
      <div className="status">{status}</div>
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
      </div>
    </>
  );
}
function Square({
  value,
  onSquareClick,
}: {
  value: string;
  onSquareClick: () => void;
}) {
  return (
    <div>
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    </div>
  );
}

const calculateWinner = (Squares: Array<string>) => {
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
    if (Squares[a] && Squares[a] === Squares[b] && Squares[a] === Squares[c]) {
      return Squares[a];
    }
  }
  return null;
};
