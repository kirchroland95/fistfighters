import React, { useState } from "react";
import Character from "./Character";
import generateSuperName from "superheroes";
import "./Battle.css";

function Battle(props) {
  const [opponentCharacter, setOpponentCharacter] = useState({
    name: generateSuperName.random(),
    health: 100,
    attack: Math.floor(Math.random() * 4) + props.level, // Adjust the opponent's stats as needed
    defense: Math.floor(Math.random() * 4) + props.level,
    combo: 2*props.level,
    picture: "../assets/fighter" + props.level + ".jpg",
  });
  const [moves, setMoves] = useState([]); // Array to store moves during the battle
  const [attackInProgress, setAttackInProgress] = useState(false); // Array to store moves during the battle
  function handleNextScreen() {
    if (props.playerCharacter.health <= 0) {
      props.onGameOver();
    } else {
      if (opponentCharacter.health <= 0) {
        if (props.level < 10) {
          props.setLevel();
          props.onNextBattleClick();
        } else {
          props.setLevel();
          props.onGameOver();
        }
      }
    }
  }

  // Calculates attack
  function Attacking(maxAttack, combo) {
    var damage=Math.floor(Math.random() * (maxAttack + 1));
    if(damage===maxAttack){
      damage=2*maxAttack;
    }
    return damage+combo;
  }
  // Calculates defense
  function Defending(maxDefense) {
    return Math.floor(Math.random() * (maxDefense + 1));
  }
  // Damage Text
  function DamageText(attacker, maxDamage, damage){
    if(damage<=maxDamage/2){
      const playerMove = `Dealing ${damage} damage, ${attacker} executes a quick jab`;
      return playerMove;
    }else{
      if((damage>maxDamage/2)&&(damage<=maxDamage)){
        const playerMove = `A forceful strike from ${attacker} results in ${damage} damage`;
        return playerMove;
      }else{
        const playerMove = `${attacker} executes a precise strike, resulting in a critical hit of ${damage} damage`;
        return playerMove;
      }
    }
  }
  // Block Text
  function BlockText(attacker, defender){
    const blockedMove= `${defender} skillfully blocks ${attacker}'s incoming strike`
    return blockedMove;
  }

  // FIGHT SIMULATION
  // On button press, P1 attacks followed by P2 attacks
  // Repeat with each button press until one player gets Knocked Out
  function simulateFight() {
    if(!attackInProgress){
        setAttackInProgress(true);
    var timer = 0;
    var increase = 1000;
    if (opponentCharacter.health <= 0) {
      setTimeout(() => {
        setMoves((prevMoves) => [
          "Your opponent is unconscious, you stop your attack",
          ...prevMoves,
        ]);
        setAttackInProgress(false);
      }, timer);
      timer = timer + increase;
    } else {
      if (props.playerCharacter.health <= 0) {
        setTimeout(() => {
          setMoves((prevMoves) => [
            "You are unable to move your body",
            ...prevMoves,
          ]);
          setAttackInProgress(false);
        }, timer);
        timer = timer + increase;
      } else {
        /////////////////////
        // PLAYER ATTACKS //
        ////////////////////
        var comboCounterPlayer=0;
        var totalDamageDealtToOpponent = 0;
        var playerNextHitChance = 100;
        var followupAttack = Math.floor(Math.random() * 100);
        while (playerNextHitChance > followupAttack) {
          var playerAttack = Attacking(props.playerCharacter.attack, comboCounterPlayer);
          var opponentDefense = Defending(opponentCharacter.defense);
          var playerDamage = Math.max(playerAttack - opponentDefense, 0);
          if (playerNextHitChance === 100) {
            // if 100, this is the first attack
            comboCounterPlayer=comboCounterPlayer+1;
            if (playerDamage > 0 && opponentCharacter.health > 0) {
              // damage was dealt
              const playerMove = DamageText(props.playerCharacter.name,props.playerCharacter.attack,playerDamage);
              // increase total damage to update damage just once after all hits are done
              totalDamageDealtToOpponent =
                totalDamageDealtToOpponent + playerDamage;
              setTimeout(() => {
                setMoves((prevMoves) => {
                  return [playerMove, ...prevMoves];
                });
              }, timer);
              timer = timer + increase;
            } else {
              // attack was blocked
              const playerMove = BlockText(props.playerCharacter.name,opponentCharacter.name);
              setTimeout(() => {
                setMoves((prevMoves) => {
                  return [playerMove, ...prevMoves];
                });
              }, timer);
              timer = timer + increase;
            }
          } else {
            // this is a followup attack / combo
            comboCounterPlayer=comboCounterPlayer+1;
            if (playerDamage > 0 && opponentCharacter.health > 0) {
              // damage greater than 0, damage was dealt
              const playerMove = DamageText(props.playerCharacter.name,props.playerCharacter.attack,playerDamage);
              totalDamageDealtToOpponent =
                totalDamageDealtToOpponent + playerDamage;
              setTimeout(() => {
                setMoves((prevMoves) => [playerMove, ...prevMoves]);
              }, timer);
              timer = timer + increase;
            } else {
              // attack was blocked
              const playerMove = BlockText(props.playerCharacter.name,opponentCharacter.name);
              setTimeout(() => {
                setMoves((prevMoves) => [playerMove, ...prevMoves]);
              }, timer);
              timer = timer + increase;
            }
          }
          // calculate next hit chance
          playerNextHitChance =
            playerNextHitChance / 2 + props.playerCharacter.combo;
          followupAttack = Math.floor(Math.random() * 100);
        }

        var newOpponentHealth =
          opponentCharacter.health - totalDamageDealtToOpponent;
        // Update opponent's health
        setTimeout(() => {
          setOpponentCharacter((prevOpponent) => {
            const updatedOpponent = {
              ...prevOpponent,
              health: Math.max(newOpponentHealth, 0),
            };
            return updatedOpponent;
          });
        }, timer - increase);
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (newOpponentHealth <= 0) {
          setTimeout(() => {
            setMoves((prevMoves) => [
               `${props.playerCharacter.name} Wins!`, `${opponentCharacter.name} Knocked Out!`,
              ...prevMoves,
            ]);
            setAttackInProgress(false);
          }, timer);
        } else {
          var comboCounterOpponent=0;
          var totalDamageDealtToPlayer = 0;
          var opponentNextHitChance = 100;
          followupAttack = Math.floor(Math.random() * 100);
          // OPPONENT ATTACKS
          while (opponentNextHitChance > followupAttack) {
            var opponentAttack = Attacking(opponentCharacter.attack,comboCounterOpponent);
            var playerDefense = Defending(props.playerCharacter.defense);
            var opponentDamage = Math.max(opponentAttack - playerDefense, 0);
            if (opponentNextHitChance === 100) {
              // if 100, this is the first hit
              // comboCounterOpponent=comboCounterOpponent+1;
              if (opponentDamage > 0 && props.playerCharacter.health > 0) {
                // damage greater than 0, damage was dealt
                const opponentMove =DamageText(opponentCharacter.name,opponentCharacter.attack,opponentDamage);
                totalDamageDealtToPlayer =
                  totalDamageDealtToPlayer + opponentDamage;
                setTimeout(() => {
                  setMoves((prevMoves) => [opponentMove, ...prevMoves]);
                }, timer);
                timer = timer + increase;
              } else {
                // damage was 0, attack blocked
                const opponentMove = BlockText(opponentCharacter.name,props.playerCharacter.name);
                setTimeout(() => {
                  setMoves((prevMoves) => [opponentMove, ...prevMoves]);
                }, timer);
                timer = timer + increase;
              }
            } else {
              // this is a combo
              // comboCounterOpponent=comboCounterOpponent+1;
              if (opponentDamage > 0 && props.playerCharacter.health > 0) {
                // damage greater than 0, damage was dealt
                const opponentMove =DamageText(opponentCharacter.name,opponentCharacter.attack,opponentDamage);
                totalDamageDealtToPlayer =
                  totalDamageDealtToPlayer + opponentDamage;
                setTimeout(() => {
                  setMoves((prevMoves) => [opponentMove, ...prevMoves]);
                }, timer);
                timer = timer + increase;
              } else {
                // damage was 0, attack blocked
                const opponentMove = BlockText(opponentCharacter.name,props.playerCharacter.name);
                setTimeout(() => {
                  setMoves((prevMoves) => [opponentMove, ...prevMoves]);
                }, timer);
                timer = timer + increase;
              }
            }
            opponentNextHitChance =
              (opponentNextHitChance / 2) - 5;
            followupAttack = Math.floor(Math.random() * 100);
          }
          // Update player health
          var newPlayerHealth =
            props.playerCharacter.health - totalDamageDealtToPlayer;
          setTimeout(() => {
            props.updatePlayer((prevplayer) => {
              const updatedPlayer = {
                ...prevplayer,
                health: Math.max(newPlayerHealth, 0),
              };
              setAttackInProgress(false);
              return updatedPlayer;
            });
          }, timer - increase);
          if (newPlayerHealth <= 0) {
            setTimeout(() => {
              setMoves((prevMoves) => [`${opponentCharacter.name} Wins!`, `${props.playerCharacter.name} Knocked Out!`, ...prevMoves]);
            }, timer);
            timer = timer + increase;
          }
        }
      }
    }
}
  }

  return (
    <div>
      <h1>Match {props.level}</h1>
      <div>
        <div className="battlescreen">
          <div style={{ marginRight: "10px" }}>
            <Character character={props.playerCharacter} />
          </div>
          <div>
            <h2>Versus</h2>
            <button className="start-attack" onClick={simulateFight}>
              Attack
            </button>
            {props.playerCharacter.health <= 0 ||
            opponentCharacter.health <= 0 ? (
              <button className="next-battle" onClick={handleNextScreen}>
                Continue
              </button>
            ) : null}
            {moves.map((move, index) => (
              <p key={index}>{move}</p>
            ))}
          </div>
          <div style={{ marginLeft: "10px" }}>
            <Character character={opponentCharacter} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Battle;
