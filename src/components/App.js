import './App.css';
import React, {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import StartMenu from './StartMenu';
import CharacterSheet from './CharacterSheet';
import Battle from './Battle';
import Result from './Results';

function App() {
  const [gameState, setGameState] = useState('start');
  const [currentLevel, setCurrentLevel] = useState(1);
  // Define a character object with attributes
  const initialCharacter = {
    name: 'Falkon',
    health: 100,
    attack: 5,
    defense: 5,
    combo: 5,
    // Add the path to the character image
    picture: '../assets/player.jpg',
  };
  const [playerCharacter, setPlayerCharacter] = useState(initialCharacter);

  const handleStartButtonClick = () => {
    setGameState('characterSheet');
  };
  const handleStartBattleClick = () => {
    setGameState('battle');
  };
  const handleNextBattleClick = () => {
    setPlayerCharacter((prevplayer) => {
      const resetPlayer = {
        ...prevplayer,
        health: Math.min(prevplayer.health+50, 100) ,
      };
      return resetPlayer;
    });
    setGameState('characterSheet');

  };
  const handleResultClick = () => {
    setGameState('start');
    setCurrentLevel(1);
  };
  const handleGameOver = () => {
    setGameState('results');
    setPlayerCharacter(initialCharacter)
  };
  const handleUpdateLevel = () => {
    setCurrentLevel((prevLevel) => prevLevel + 1);
  };

  return (
    <div className="App">
      <Header/>
      {gameState === 'start' && <StartMenu onStartButtonClick={handleStartButtonClick} />}
      {gameState === 'characterSheet' && <CharacterSheet character={playerCharacter} onUpdateStats={setPlayerCharacter} onStartBattle={handleStartBattleClick} />}
      {gameState === 'battle' && <Battle level={currentLevel} playerCharacter={playerCharacter} updatePlayer={setPlayerCharacter}  setLevel={handleUpdateLevel} onGameOver={handleGameOver} onNextBattleClick={handleNextBattleClick} />}
      {gameState === 'results' && <Result level={currentLevel} onResultClick={handleResultClick} />}
      <Footer/>
    </div>
  );
}

export default App;
