import React from 'react';

function Character({character}){

    
    return <div>
        <h1>{character.name}</h1>
        <img src={character.picture} alt="Character" />
        <p>Health: {character.health}</p>
        <p>Attack: {character.attack}</p>
        <p>Defense: {character.defense}</p>
        <p>Combo: {character.combo}</p>
        </div>;
  }

  export default Character;