import { useState } from "react";
import Board from "./components/Board";

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
