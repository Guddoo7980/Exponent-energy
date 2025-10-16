import React from "react";
import Tile from "./Tile";
import "../App.css";

export default function GameBoard({ board, size }) {
  const boardStyle = {
    gridTemplateColumns: `repeat(${size}, 80px)`,
    gridTemplateRows: `repeat(${size}, 80px)`,
  };

  return (
    <div className="board" style={boardStyle}>
      {board.flat().map((v, i) => (
        <Tile key={i} value={v} />
      ))}
    </div>
  );
}
