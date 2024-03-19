// App.js
import React, { useState } from 'react';
import './App.css';
import Buscamina from './component/buscamina';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    if (playerName && selectedDifficulty) {
      setGameStarted(true);
    } else {
      alert('Please enter your name and select a difficulty level.');
    }
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <div className="landing-page">
          <h1>Welcome to Minesweeper</h1>
          <div>
            <label htmlFor="playerName">Enter your name:</label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="difficulty">Select difficulty:</label>
            <select
              id="difficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="">Choose a difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <div className="game">
          <Buscamina difficulty={selectedDifficulty} playerName={playerName} />
        </div>
      )}
    </div>
  );
}

export default App;
