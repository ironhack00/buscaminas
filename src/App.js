// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;
const POINTS_PER_CELL = 10;

function App() {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const newBoard = Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, () => ({
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

    while (minesPlaced < NUMBER_OF_MINES) {
      const x = Math.floor(Math.random() * BOARD_SIZE);
      const y = Math.floor(Math.random() * BOARD_SIZE);

      if (!board[x][y].isMine) {
        board[x][y].isMine = true;
        minesPlaced++;
      }
    }
  };

  const calculateNearbyMines = (board) => {
    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        if (!board[x][y].isMine) {
          let nearbyMines = 0;

          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              if (
                x + dx >= 0 &&
                x + dx < BOARD_SIZE &&
                y + dy >= 0 &&
                y + dy < BOARD_SIZE &&
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
      setPoints(points + POINTS_PER_CELL);
    }
  };

  const revealCell = (x, y) => {
    const newBoard = [...board];
    newBoard[x][y].revealed = true;
    setBoard(newBoard);
  };

  return (
    <div className="app">
      <h1>Buscaminas</h1>
      <h2>Puntos: {points}</h2>
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
      {gameOver && <h2>¡Perdiste! Tu puntaje total es: {points}</h2>}
    </div>
  );
}

export default App;
