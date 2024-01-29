import React,{useState} from 'react';
import Character from './Character';

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

    function Attacking(maxAttack){
        return (Math.floor(Math.random() * (maxAttack+11)));
    }

    function Defending(maxDefense){
        return (5+(Math.floor(Math.random() * (maxDefense+1))));
    }

    function simulateFight(){
        
        if(opponentCharacter.health<=0){
            setMoves((prevMoves) => ["Your opponent is unconscious, you stop your attack", ...prevMoves]);
        }else{
            if(props.playerCharacter.health<=0){
                setMoves((prevMoves) => ["You are unable to move your body", ...prevMoves]);
            }else{
                // PLAYER ATTACKS
                var totalDamageDealtToOpponent=0;
                var playerNextHitChance = 100;
                var followupAttack = Math.floor(Math.random() * 100)
                while(playerNextHitChance>followupAttack){
                    var playerAttack=Attacking(props.playerCharacter.attack)
                    var opponentDefense=Defending(opponentCharacter.defense);
                    var playerDamage=Math.max(playerAttack-opponentDefense, 0);
                    if(playerNextHitChance===100){ 
                        // if 100, this is the first hit
                        if((playerDamage>0)&&(opponentCharacter.health>0)){ 
                            // damage greater than 0, damage was dealt
                            const playerMove = `${props.playerCharacter.name} attacks and deals ${playerDamage} damage`;
                            // Update opponent's health
                            // setOpponentCharacter((prevOpponent) => {
                            //     const updatedOpponent = {
                            //       ...prevOpponent,
                            //       health: Math.max(prevOpponent.health - playerDamage, 0),
                            //     };
                            //     return updatedOpponent;
                            //   });
                            totalDamageDealtToOpponent=totalDamageDealtToOpponent+playerDamage;
                            
                              setMoves((prevMoves) => {
                                return [playerMove, ...prevMoves];
                              });
                        }else{ 
                            // damage was 0, attack blocked
                            const playerMove = `${props.playerCharacter.name} attacks but ${opponentCharacter.name} blocks the attack`;
                            setMoves((prevMoves) => {
                                return [playerMove, ...prevMoves];
                              });
                        }
                    }else{
                        // this is a combo
                        if((playerDamage>0)&&(opponentCharacter.health>0)){ 
                            // damage greater than 0, damage was dealt
                            const playerMove = `${props.playerCharacter.name} follows up with another attack and deals ${playerDamage} damage`;
                            // Update opponent's health
                            // setOpponentCharacter((prevOpponent) => {
                            //     const updatedOpponent = {
                            //       ...prevOpponent,
                            //       health: Math.max(prevOpponent.health - playerDamage, 0),
                            //     };
                            //     return updatedOpponent;
                            //   });
                            totalDamageDealtToOpponent=totalDamageDealtToOpponent+playerDamage;
                            setMoves((prevMoves) => [playerMove, ...prevMoves]);
                        }else{ 
                            // damage was 0, attack blocked
                            const playerMove = `${props.playerCharacter.name} follows up with another attack but ${opponentCharacter.name} blocks the attack`;
                            setMoves((prevMoves) => [playerMove, ...prevMoves]);
                        }
                    }                  
                    // playerNextHitChance = nextHitChance/2+props.playerCharacter.combo;
                    playerNextHitChance=0
                    followupAttack = Math.floor(Math.random() * 100)
                }
                var newOpponentHealth=opponentCharacter.health - totalDamageDealtToOpponent;
                setOpponentCharacter((prevOpponent) => {
                    const updatedOpponent = {
                      ...prevOpponent,
                      health: Math.max(newOpponentHealth, 0),
                    };
                    return updatedOpponent;
                  });
                  if(newOpponentHealth<=0){
                    setMoves((prevMoves) => ["Opponent faints", ...prevMoves]);
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
                        // opponentNextHitChance = nextHitChance/2+props.playerCharacter.combo;

                        opponentNextHitChance = 0;
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
                }
                
            }
        }
    }

    


    return <div>
        <h1>Battle Screen Match {props.level}</h1>
        <div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top' }}>
        <div>
        <Character character={props.playerCharacter}/>
        </div>
        <div>
          <h2>Versus</h2>
          <button onClick={simulateFight}>Attack</button>
        {moves.map((move, index) => (
          <p key={index}>{move}</p>
        ))}
        </div>
        <div>
        <Character character={opponentCharacter}/>
        </div>
      </div>
    </div>

        <button onClick={handleNextScreen}>Continue</button>
        </div>;
  }

  export default Battle;