import React, {useState} from 'react';
import Character from './Character';
import './CharacterSheet.css'

function CharacterSheet({character, onStartBattle, onUpdateStats}){
    const [attributePoints, setAttributePoints] = useState(2); // Set the initial number of attribute points

    function handleIncreaseStat(stat) {
        if (attributePoints > 0) {
            let pointsToSpend = 1; // Default points required for most stats
            let increaseAmount = 1; // Default increase amount for most stats
      
            if (stat === 'combo') {
              // For combo stat, require 2 attribute points and increase by 5
              pointsToSpend = 2;
              increaseAmount = 5;
            }
      
            if (attributePoints >= pointsToSpend) {
              const updatedCharacter = {
                ...character,
                [stat]: character[stat] + increaseAmount,
              };
      
              onUpdateStats(updatedCharacter);
              setAttributePoints(attributePoints - pointsToSpend);
            }
          }
      };

    return <div>
        <h1>Training Grounds</h1>
        <Character character={character}/>
        <div>
        <h2>Attribute Points: {attributePoints}</h2>
        <button className="attack" onClick={() => handleIncreaseStat('attack')}>Increase Attack</button>
        <button className="defense" onClick={() => handleIncreaseStat('defense')}>Increase Defense</button>
        <button className="combo" onClick={() => handleIncreaseStat('combo')}>Increase Combo</button>
      </div>
        <button className="next-fight" onClick={onStartBattle}>FIGHT!</button>
        </div>;
  }

  export default CharacterSheet;