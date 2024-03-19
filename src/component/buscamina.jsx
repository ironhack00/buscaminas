// Buscamina.js

import React, { useState, useEffect } from 'react';
import './buscamina.css';

function Buscamina({ difficulty, playerName }) {
  const [boardSize, setBoardSize] = useState(0);
  const [numberOfMines, setNumberOfMines] = useState(0);
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setDifficultySettings();
  }, []);

  useEffect(() => {
    initializeBoard();
  }, [boardSize, numberOfMines]);

  const setDifficultySettings = () => {
    switch (difficulty) {
      case 'easy':
        setBoardSize(8);
        setNumberOfMines(10);
        break;
      case 'medium':
        setBoardSize(10);
        setNumberOfMines(20);
        break;
      case 'hard':
        setBoardSize(12);
        setNumberOfMines(30);
        break;
      default:
        break;
    }
  };

  const initializeBoard = () => {
    const newBoard = Array.from({ length: boardSize }, () =>
      Array.from({ length: boardSize }, () => ({
        isMine: false,
        revealed: false,
        nearbyMines: 0,
      }))
    );

    placeMines(newBoard);
    calculateNearbyMines(newBoard);
    setBoard(newBoard);
  };

  const placeMines = (board) => {
    let minesPlaced = 0;

    while (minesPlaced < numberOfMines) {
      const x = Math.floor(Math.random() * boardSize);
      const y = Math.floor(Math.random() * boardSize);

      if (!board[x][y].isMine) {
        board[x][y].isMine = true;
        minesPlaced++;
      }
    }
  };

  const calculateNearbyMines = (board) => {
    for (let x = 0; x < boardSize; x++) {
      for (let y = 0; y < boardSize; y++) {
        if (!board[x][y].isMine) {
          let nearbyMines = 0;

          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              if (
                x + dx >= 0 &&
                x + dx < boardSize &&
                y + dy >= 0 &&
                y + dy < boardSize &&
                board[x + dx][y + dy].isMine
              ) {
                nearbyMines++;
              }
            }
          }

          board[x][y].nearbyMines = nearbyMines;
        }
      }
    }
  };

  const handleCellClick = (x, y) => {
    if (gameOver || board[x][y].revealed) return;

    if (board[x][y].isMine) {
      setGameOver(true);
    } else {
      revealCell(x, y);
      setPoints(points + 10);
    }
  };

  const revealCell = (x, y) => {
    const newBoard = [...board];
    newBoard[x][y].revealed = true;
    setBoard(newBoard);
  };

  return (
    <div className="buscamina">
      <h1>Buscaminas</h1>
      <h2>Points: {points}</h2>
      <div className="board">
        {board.map((row, x) => (
          <div key={x} className="row">
            {row.map((cell, y) => (
              <div
                key={y}
                className={`cell ${cell.revealed ? 'revealed' : ''} ${
                  cell.isMine && gameOver ? 'mine' : ''
                }`}
                onClick={() => handleCellClick(x, y)}
              >
                {cell.revealed ? (cell.isMine ? '💣' : cell.nearbyMines || '') : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && <h2>Game Over, {playerName}! Total Points: {points}</h2>}
    </div>
  );
}

export default Buscamina;
