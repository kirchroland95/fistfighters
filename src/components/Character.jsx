import React from 'react';

function Character({character}){
    
    
    return <div>
        <img src={character.picture} alt="Character" />
        <p>Name: {character.name}</p>
        <p>Health: {character.health}</p>
        <p>Attack: {character.attack}</p>
        <p>Defense: {character.defense}</p>
        <p>Combo: {character.combo}</p>
        </div>;
  }

  export default Character;