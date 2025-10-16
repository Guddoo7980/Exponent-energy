import React from "react";

export default function ScoreBoard({ score }) {
  return (
    <div className="score-board">
      <div className="score">Score: {score}</div>
    </div>
  );
}
