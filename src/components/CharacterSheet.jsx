import React from 'react';
import Character from './Character';

function CharacterSheet({character, onStartBattle}){
    return <div>
        <h1>CharacterSheet</h1>
        <Character character={character}/>
        <button onClick={onStartBattle}>Begin Battle</button>
        </div>;
  }

  export default CharacterSheet;