import React, { useState, useEffect } from 'react';
import './App.css';
import Buscamina from './component/buscamina';
import { CSSTransition } from 'react-transition-group';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showStartButton, setShowStartButton] = useState(false);

  // Arreglo con las 4 imágenes de fondo
  const backgroundImages = [
    'url(https://www.tuexperto.com/wp-content/uploads/2020/03/los-14-mejores-bancos-de-imagenes-hd-para-descargar-gratis-de-2020-1200x640.jpg.webp)',
    'url(https://images.pexels.com/photos/1447092/pexels-photo-1447092.png?auto=compress&cs=tinysrgb&w=600)',
    'url(https://images.pexels.com/photos/6005203/pexels-photo-6005203.jpeg?auto=compress&cs=tinysrgb&w=600)',
    'url(https://images.pexels.com/photos/1756325/pexels-photo-1756325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
  ];

  useEffect(() => {
    // Intervalo para cambiar la imagen cada 7 segundos
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  useEffect(() => {
    // Verificar si playerName y selectedDifficulty están completos para mostrar el botón
    setShowStartButton(playerName.trim() !== '' && selectedDifficulty !== '' && !gameStarted);
  }, [playerName, selectedDifficulty, gameStarted]);

  const handleStartGame = () => {
    if (playerName.trim() !== '' && selectedDifficulty !== '') {
      setGameStarted(true);
    } else {
      alert('Please enter your name and select a difficulty level.');
    }
  };

  return (
    <div className="app" style={{ backgroundImage: backgroundImages[currentImageIndex] }}>
      <div className="overlay">
        {!gameStarted && (
          <div className="landing-page">
            <h1>Welcome to Minesweeper</h1>
            <div>
              <label htmlFor="playerName">Enter your name:</label>
              <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Your name"
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
            {playerName.length > 0 && selectedDifficulty.length > 0 && (
              <CSSTransition
                in={showStartButton}
                appear={true}
                timeout={1000}
                classNames="button"
              >
                <button onClick={handleStartGame} className="bomb">
                  Start Game
                </button>
              </CSSTransition>
            )}
          </div>
        )}
        {gameStarted && <Buscamina difficulty={selectedDifficulty} playerName={playerName} />}
      </div>
    </div>
  );
}

export default App;
