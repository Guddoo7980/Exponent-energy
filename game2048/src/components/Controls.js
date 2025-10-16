import React from "react";

export default function Controls({ onMove, onRestart }) {
  return (
    <div className="controls">
      <div className="btn-row">
        <button onClick={() => onMove("up")}>↑</button>
      </div>
      <div className="btn-row">
        <button onClick={() => onMove("left")}>←</button>
        <button onClick={() => onMove("down")}>↓</button>
        <button onClick={() => onMove("right")}>→</button>
      </div>
      <button className="restart" onClick={onRestart}>Restart</button>
    </div>
  );
}
