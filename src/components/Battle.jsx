import React,{useState} from 'react';
import Character from './Character';
import generateSuperName from "superheroes";
import './Battle.css'

function Battle(props){
    const [opponentCharacter, setOpponentCharacter] = useState({
        name: generateSuperName.random(),
        health: 100,
        attack: (Math.floor(Math.random() *4))+props.level, // Adjust the opponent's stats as needed
        defense: (Math.floor(Math.random() *4))+props.level,
        combo: props.level,
        picture: '../assets/fighter'+ props.level+'.jpg',
      });
    const [moves, setMoves] = useState([]); // Array to store moves during the battle

    function handleNextScreen(){
        if(props.playerCharacter.health<=0){
            props.onGameOver();
        }else{
            if(opponentCharacter.health<=0){
                if(props.level<10){
                    props.setLevel();
                    props.onNextBattleClick();
                }else{            
                    props.setLevel();      
                    props.onGameOver();
                }
            }
        }
    }

    // Calculates attack
    function Attacking(maxAttack){
        return (Math.floor(Math.random() * (maxAttack+1)));
    }
    // Calculates defense
    function Defending(maxDefense){
        return (Math.floor(Math.random() * (maxDefense+1)));
    }

    // FIGHT SIMULATION
    // On button press, P1 attacks followed by P2 attacks
    // Repeat with each button press until one player gets Knocked Out
    function simulateFight(){
        if(opponentCharacter.health<=0){
            setMoves((prevMoves) => ["Your opponent is unconscious, you stop your attack", ...prevMoves]);
        }else{
            if(props.playerCharacter.health<=0){
                setMoves((prevMoves) => ["You are unable to move your body", ...prevMoves]);
            }else{
                /////////////////////
                // PLAYER ATTACKS //
                ////////////////////
                var totalDamageDealtToOpponent=0;
                var playerNextHitChance = 100;
                var followupAttack = Math.floor(Math.random() * 100)
                while(playerNextHitChance>followupAttack){
                    var playerAttack=Attacking(props.playerCharacter.attack)
                    var opponentDefense=Defending(opponentCharacter.defense);
                    var playerDamage=Math.max(playerAttack-opponentDefense, 0);
                    if(playerNextHitChance===100){ 
                        // if 100, this is the first attack
                        if((playerDamage>0)&&(opponentCharacter.health>0)){ 
                            // damage was dealt
                            const playerMove = `${props.playerCharacter.name} attacks and deals ${playerDamage} damage`;
                            // increase total damage to update damage just once after all hits are done
                            totalDamageDealtToOpponent=totalDamageDealtToOpponent+playerDamage;
                              setMoves((prevMoves) => {
                                return [playerMove, ...prevMoves];
                              });
                        }else{ 
                            // attack was blocked
                            const playerMove = `${props.playerCharacter.name} attacks but ${opponentCharacter.name} blocks the attack`;
                            setMoves((prevMoves) => {
                                return [playerMove, ...prevMoves];
                              });
                        }
                    }else{
                        // this is a followup attack / combo
                        if((playerDamage>0)&&(opponentCharacter.health>0)){ 
                            // damage greater than 0, damage was dealt
                            const playerMove = `${props.playerCharacter.name} follows up with another attack and deals ${playerDamage} damage`;
                            totalDamageDealtToOpponent=totalDamageDealtToOpponent+playerDamage;
                            setMoves((prevMoves) => [playerMove, ...prevMoves]);
                        }else{ 
                            // attack was blocked
                            const playerMove = `${props.playerCharacter.name} follows up with another attack but ${opponentCharacter.name} blocks the attack`;
                            setMoves((prevMoves) => [playerMove, ...prevMoves]);
                        }
                    }
                    // calculate next hit chance                  
                    playerNextHitChance = playerNextHitChance/2+props.playerCharacter.combo;
                    followupAttack = Math.floor(Math.random() * 100)
                }
                var newOpponentHealth=opponentCharacter.health - totalDamageDealtToOpponent;
                // Update opponent's health
                setOpponentCharacter((prevOpponent) => {
                    const updatedOpponent = {
                      ...prevOpponent,
                      health: Math.max(newOpponentHealth, 0),
                    };
                    return updatedOpponent;
                  });
///////////////////////////////////////////////////////////////////////////////////////////////////////////                  
                  if(newOpponentHealth<=0){
                    setMoves((prevMoves) => [`${opponentCharacter.name} Knocked Out!`, ...prevMoves]);
                }else{
                    var totalDamageDealtToPlayer=0;
                    var opponentNextHitChance = 100;
                    followupAttack = Math.floor(Math.random() * 100)
                    // OPPONENT ATTACKS
                    while(opponentNextHitChance>followupAttack){
                        var opponentAttack=Attacking(opponentCharacter.attack)
                        var playerDefense=Defending(props.playerCharacter.defense);
                        var opponentDamage=Math.max(opponentAttack-playerDefense, 0);
                        if(opponentNextHitChance===100){ 
                            // if 100, this is the first hit
                            if((opponentDamage>0)&&(props.playerCharacter.health>0)){ 
                                // damage greater than 0, damage was dealt
                                const opponentMove = `${opponentCharacter.name} attacks and deals ${opponentDamage} damage`;
                                // Update opponent's health
                                // props.updatePlayer((prevPlayer) => {
                                //     const updatedPlayer = {
                                //       ...prevPlayer,
                                //       health: Math.max(prevPlayer.health - opponentDamage, 0),
                                //     };
                                //     return updatedPlayer;
                                //   });
                                totalDamageDealtToPlayer=totalDamageDealtToPlayer+opponentDamage;
                                setMoves((prevMoves) => [opponentMove, ...prevMoves]);
                            }else{ 
                                // damage was 0, attack blocked
                                const opponentMove = `${opponentCharacter.name} attacks but ${props.playerCharacter.name} blocks the attack`;
                                setMoves((prevMoves) => [opponentMove, ...prevMoves]);
                            }
                        }else{
                            // this is a combo
                            if((opponentDamage>0)&&(props.playerCharacter.health>0)){ 
                                // damage greater than 0, damage was dealt
                                const opponentMove = `${opponentCharacter.name} follows up with another attack and deals ${opponentDamage} damage`;
                                // Update opponent's health
                                // props.updatePlayer((prevplayer) => {
                                //     const updatedPlayer = {
                                //       ...prevplayer,
                                //       health: Math.max(prevplayer.health - opponentDamage, 0),
                                //     };
                                //     return updatedPlayer;
                                //   });
                                totalDamageDealtToPlayer=totalDamageDealtToPlayer+opponentDamage;
                                setMoves((prevMoves) => [opponentMove, ...prevMoves]);
                            }else{ 
                                // damage was 0, attack blocked
                                const opponentMove = `${opponentCharacter.name} follows up with another attack but ${props.playerCharacter.name} blocks the attack`;
                                setMoves((prevMoves) => [opponentMove, ...prevMoves]);
                            }
                        }                  
                        opponentNextHitChance = opponentNextHitChance/2+props.playerCharacter.combo;

                        // opponentNextHitChance = 0;
                        followupAttack = Math.floor(Math.random() * 100)
                    }
                    var newPlayerHealth=props.playerCharacter.health - totalDamageDealtToPlayer;
                    props.updatePlayer((prevplayer) => {
                        const updatedPlayer = {
                          ...prevplayer,
                          health: Math.max(newPlayerHealth, 0),
                        };
                        return updatedPlayer;
                      });
                      if(newPlayerHealth<=0){
                        setMoves((prevMoves) => ["Player Knocked Out!", ...prevMoves]);
                    }
                }
                
            }
        }
    }

    


    return <div>
        <h1>Match {props.level}</h1>
        <div>

      <div class="battlescreen">
        <div  style={{ marginRight: '10px' }}>
        <Character character={props.playerCharacter}/>
        </div>
        <div>
          <h2>Versus</h2>
          <button class="start-attack" onClick={simulateFight}>Attack</button>
          {props.playerCharacter.health <= 0 || opponentCharacter.health <= 0 ? (
          <button class="next-battle" onClick={handleNextScreen}>Continue</button>
        ) : null}
        {moves.map((move, index) => (
          <p key={index}>{move}</p>
        ))}
        </div>
        <div style={{ marginLeft: '10px' }}>
        <Character character={opponentCharacter}/>
        </div>
      </div>
    </div>
    </div>;
  }

  export default Battle;