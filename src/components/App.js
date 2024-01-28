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
    name: 'Player',
    health: 100,
    attack: 10,
    defense: 5,
    combo: 0,
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
    setGameState('characterSheet');
  };
  const handleResultClick = () => {
    setGameState('start');
  };
  const handleGameOver = () => {
    setGameState('results');
    setCurrentLevel(1);
  };
  const handleUpdateLevel = () => {
    setCurrentLevel((prevLevel) => prevLevel + 1);
  };

  return (
    <div className="App">
      <Header/>
      {gameState === 'start' && <StartMenu onStartButtonClick={handleStartButtonClick} />}
      {gameState === 'characterSheet' && <CharacterSheet character={playerCharacter} onStartBattle={handleStartBattleClick} />}
      {gameState === 'battle' && <Battle level={currentLevel} playerCharacter={playerCharacter} setLevel={handleUpdateLevel} onGameOver={handleGameOver} onNextBattleClick={handleNextBattleClick} />}
      {gameState === 'results' && <Result onResultClick={handleResultClick} />}
      <Footer/>
    </div>
  );
}

export default App;
