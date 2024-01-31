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
    combo: props.level,
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
  function Attacking(maxAttack) {
    return Math.floor(Math.random() * (maxAttack + 1));
  }
  // Calculates defense
  function Defending(maxDefense) {
    return Math.floor(Math.random() * (maxDefense + 1));
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
        var totalDamageDealtToOpponent = 0;
        var playerNextHitChance = 100;
        var followupAttack = Math.floor(Math.random() * 100);
        while (playerNextHitChance > followupAttack) {
          var playerAttack = Attacking(props.playerCharacter.attack);
          var opponentDefense = Defending(opponentCharacter.defense);
          var playerDamage = Math.max(playerAttack - opponentDefense, 0);
          if (playerNextHitChance === 100) {
            // if 100, this is the first attack
            if (playerDamage > 0 && opponentCharacter.health > 0) {
              // damage was dealt
              const playerMove = `${props.playerCharacter.name} attacks and deals ${playerDamage} damage`;
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
              const playerMove = `${props.playerCharacter.name} attacks but ${opponentCharacter.name} blocks the attack`;

              setTimeout(() => {
                setMoves((prevMoves) => {
                  return [playerMove, ...prevMoves];
                });
              }, timer);
              timer = timer + increase;
            }
          } else {
            // this is a followup attack / combo
            if (playerDamage > 0 && opponentCharacter.health > 0) {
              // damage greater than 0, damage was dealt
              const playerMove = `${props.playerCharacter.name} follows up with another attack and deals ${playerDamage} damage`;
              totalDamageDealtToOpponent =
                totalDamageDealtToOpponent + playerDamage;

              setTimeout(() => {
                setMoves((prevMoves) => [playerMove, ...prevMoves]);
              }, timer);
              timer = timer + increase;
            } else {
              // attack was blocked
              const playerMove = `${props.playerCharacter.name} follows up with another attack but ${opponentCharacter.name} blocks the attack`;

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
              `${opponentCharacter.name} Knocked Out!`,
              ...prevMoves,
            ]);
            setAttackInProgress(false);
          }, timer);
        } else {
          var totalDamageDealtToPlayer = 0;
          var opponentNextHitChance = 100;
          followupAttack = Math.floor(Math.random() * 100);
          // OPPONENT ATTACKS
          while (opponentNextHitChance > followupAttack) {
            var opponentAttack = Attacking(opponentCharacter.attack);
            var playerDefense = Defending(props.playerCharacter.defense);
            var opponentDamage = Math.max(opponentAttack - playerDefense, 0);
            if (opponentNextHitChance === 100) {
              // if 100, this is the first hit
              if (opponentDamage > 0 && props.playerCharacter.health > 0) {
                // damage greater than 0, damage was dealt
                const opponentMove = `${opponentCharacter.name} attacks and deals ${opponentDamage} damage`;
                totalDamageDealtToPlayer =
                  totalDamageDealtToPlayer + opponentDamage;
                setTimeout(() => {
                  setMoves((prevMoves) => [opponentMove, ...prevMoves]);
                }, timer);
                timer = timer + increase;
              } else {
                // damage was 0, attack blocked
                const opponentMove = `${opponentCharacter.name} attacks but ${props.playerCharacter.name} blocks the attack`;
                setTimeout(() => {
                  setMoves((prevMoves) => [opponentMove, ...prevMoves]);
                }, timer);
                timer = timer + increase;
              }
            } else {
              // this is a combo
              if (opponentDamage > 0 && props.playerCharacter.health > 0) {
                // damage greater than 0, damage was dealt
                const opponentMove = `${opponentCharacter.name} follows up with another attack and deals ${opponentDamage} damage`;
                totalDamageDealtToPlayer =
                  totalDamageDealtToPlayer + opponentDamage;
                setTimeout(() => {
                  setMoves((prevMoves) => [opponentMove, ...prevMoves]);
                }, timer);
                timer = timer + increase;
              } else {
                // damage was 0, attack blocked
                const opponentMove = `${opponentCharacter.name} follows up with another attack but ${props.playerCharacter.name} blocks the attack`;
                setTimeout(() => {
                  setMoves((prevMoves) => [opponentMove, ...prevMoves]);
                }, timer);
                timer = timer + increase;
              }
            }
            opponentNextHitChance =
              opponentNextHitChance / 2 + props.playerCharacter.combo;

            // opponentNextHitChance = 0;
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
              setMoves((prevMoves) => ["Player Knocked Out!", ...prevMoves]);
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
        <div class="battlescreen">
          <div style={{ marginRight: "10px" }}>
            <Character character={props.playerCharacter} />
          </div>
          <div>
            <h2>Versus</h2>
            <button class="start-attack" onClick={simulateFight}>
              Attack
            </button>
            {props.playerCharacter.health <= 0 ||
            opponentCharacter.health <= 0 ? (
              <button class="next-battle" onClick={handleNextScreen}>
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
