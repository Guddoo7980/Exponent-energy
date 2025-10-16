import React, { useEffect, useState, useCallback } from "react";
import GameBoard from "./components/GameBoard";
import Controls from "./components/Controls";
import ScoreBoard from "./components/ScoreBoard";
import "./App.css";

export default function App() {
  const [size, setSize] = useState(4);
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const createEmptyBoard = useCallback((n) =>
    Array.from({ length: n }, () => Array(n).fill(0))
  , []);

  const addRandomTile = useCallback((b) => {
    const empties = [];
    b.forEach((row, r) =>
      row.forEach((val, c) => val === 0 && empties.push([r, c]))
    );
    if (empties.length === 0) return b;
    const [r, c] = empties[Math.floor(Math.random() * empties.length)];
    b[r][c] = Math.random() < 0.9 ? 2 : 4;
    return b;
  }, []);

  const init = useCallback(() => {
    const b = createEmptyBoard(size);
    addRandomTile(b);
    addRandomTile(b);
    setBoard(b);
    setScore(0);
    setGameOver(false);
  }, [size, createEmptyBoard, addRandomTile]);

  const transpose = (m) => m[0].map((_, i) => m.map((r) => r[i]));
  const reverseRows = (m) => m.map((r) => [...r].reverse());

  const processRowLeft = (row) => {
    const filtered = row.filter((v) => v !== 0);
    const newRow = [];
    let gained = 0;
    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i] === filtered[i + 1]) {
        const merged = filtered[i] * 2;
        newRow.push(merged);
        gained += merged;
        i++;
      } else newRow.push(filtered[i]);
    }
    while (newRow.length < row.length) newRow.push(0);
    return { row: newRow, gained };
  };

  const applyMove = (dir, curBoard) => {
    let newBoard = curBoard.map((r) => [...r]);
    let totalGained = 0;
    let changed = false;

    const applyLeft = (boardMatrix) =>
      boardMatrix.map((row) => {
        const { row: processed, gained } = processRowLeft(row);
        totalGained += gained;
        if (!changed && JSON.stringify(processed) !== JSON.stringify(row))
          changed = true;
        return processed;
      });

    if (dir === "left") newBoard = applyLeft(newBoard);
    else if (dir === "right") {
      newBoard = reverseRows(newBoard);
      newBoard = applyLeft(newBoard);
      newBoard = reverseRows(newBoard);
    } else if (dir === "up") {
      newBoard = transpose(newBoard);
      newBoard = applyLeft(newBoard);
      newBoard = transpose(newBoard);
    } else if (dir === "down") {
      newBoard = transpose(newBoard);
      newBoard = reverseRows(newBoard);
      newBoard = applyLeft(newBoard);
      newBoard = reverseRows(newBoard);
      newBoard = transpose(newBoard);
    }

    return { newBoard, gained: totalGained, changed };
  };

  const checkGameState = (b) => {
    for (let r = 0; r < b.length; r++)
      for (let c = 0; c < b.length; c++)
        if (b[r][c] === 2048) return { over: true, won: true };
    for (let r = 0; r < b.length; r++) if (b[r].includes(0)) return { over: false, won: false };
    const n = b.length;
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++) {
        if (r + 1 < n && b[r][c] === b[r + 1][c]) return { over: false, won: false };
        if (c + 1 < n && b[r][c] === b[r][c + 1]) return { over: false, won: false };
      }
    return { over: true, won: false };
  };

  const handleMove = useCallback(
    (direction) => {
      if (gameOver) return;
      const { newBoard, gained, changed } = applyMove(direction, board);
      if (!changed) return;
      const withTile = addRandomTile(newBoard);
      setBoard(withTile);
      setScore((s) => s + gained);
      const state = checkGameState(withTile);
      if (state.over) {
        setGameOver(true);
        if (state.won) alert("🎉 You reached 2048!");
        else alert("Game Over! No more moves.");
      }
    },
    [board, gameOver, addRandomTile]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
        e.preventDefault();
      if (e.key === "ArrowUp") handleMove("up");
      if (e.key === "ArrowDown") handleMove("down");
      if (e.key === "ArrowLeft") handleMove("left");
      if (e.key === "ArrowRight") handleMove("right");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleMove]);

  useEffect(() => init(), [init]);

  return (
    <div className="app-root">
      <header className="header">
        <h1>2048 Game</h1>
        <div className="controls-header">
          <label>Board Size:</label>
          <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
            <option value={3}>3x3</option>
            <option value={4}>4x4</option>
            <option value={6}>6x6</option>
          </select>
          <button onClick={() => init()}>Restart</button>
        </div>
      </header>

      <ScoreBoard score={score} />
      <GameBoard board={board} size={size} />
      <Controls onMove={handleMove} onRestart={() => init()} />

      <footer>Game built by Guddoo Kumar</footer>
    </div>
  );
}
