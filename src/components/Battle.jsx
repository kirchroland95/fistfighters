import React,{useState} from 'react';

function Battle(props){
    const [opponentCharacter, setOpponentCharacter] = useState({
        name: 'Opponent',
        health: 100,
        attack: 8, // Adjust the opponent's stats as needed
        defense: 3,
        combo: 0,
        picture: '../assets/fighter'+ props.level+'.jpg',
      });
    const [moves, setMoves] = useState([]); // Array to store moves during the battle

    function handleNextScreen(){
        if(props.level<3){
            props.setLevel();
            props.onNextBattleClick();
        }else{
            props.onGameOver();
        }

    }

    return <div>
        <h1>Level {props.level} Battleing</h1>

        <div>
      <h1>Battle Screen - Level {props.currentLevel}</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>{props.playerCharacter.name}</h2>
          <img src={props.playerCharacter.picture} alt="Player" />
        </div>
        <div>
          <h2>Versus</h2>
        </div>
        <div>
          <h2>{opponentCharacter.name}</h2>
          <img src={opponentCharacter.picture} alt="Opponent" />
        </div>
      </div>
      <div>
        {moves.map((move, index) => (
          <p key={index}>{move}</p>
        ))}
      </div>
      <button onClick={handleNextScreen}>Perform Move</button>
      <button onClick={handleNextScreen}>End Battle</button>
    </div>

        <button onClick={handleNextScreen}>Continue</button>
        </div>;
  }

  export default Battle;