# FistFighters

## Introduction
FistFighters is a turn-based fighting game built using React. The player takes turns attacking to defeat their opponents. The game is designed to be simple yet strategic, providing an engaging experience for the player.

Play the game here: [FistFighters](https://kirchroland95.github.io/fistfighters/)

## Game Rules
- Start by upgrading your stats before every match. You have 2 attribute points to use:
  - **Increase Attack** increases attack by 1, requires 1 attribute point
  - **Increase Defense** increases defense by 1, requires 1 attribute point
  - **Increase Combo** increases combo by 5, requires 2 attribute point
- After each match, you are healed by 50 health points
  - **health below 50** => current health + 50 (e.g., 35HP + 50Recovery = 85HP)
  - **health above 50** => Health restored to 100 (e.g., 70HP + 50Recovery = 100HP)
- Each attribute has a specific effects:
  - **Attack**: Determines the maximum damage you can inflict to the opponent's health.
  - **Defend**: Determins how much  incoming damage can you negate on anattack. If defense > attack, hit can be blocked for 0 damage
  - **Combo**: Each attack has a chance for a followup attack, creating combos. The higher the combo attribute, the more likely to land consecutive hits.
- Players take turns performing attacks.
- The game continues until one fighter's health is reduced to zero.
- 10 fighters to beat to win.

## Technical Specifications

### State Management
State management in FistFighters is handled using React's `useState` hooks to manage the game state, player states, and action resolutions.

### Main State Variables
- `gameState`: Tracks the overall game state (e.g., current turn, game status).
- `currentLevel`: Holds the state of the current level (e.g., level 1).
- `playerCharacter`: Holds the players attributes and keeps track of upgrades.
- `opponentCharacter`: Holds the opponent attributes.

### States
There are 4 gamestates that the program cycles through. These match to their corresponding component:
- **start** - the first state, showing the title screen.
- **characterSheet** - after pressing start, you can upgrade your character on this screen.
- **battle** - after starting the fight, you are put into battle agains your opponent. After battle, you are either sent to the result screen or the characher sheet screen.
- **results** - if you win all 10 matches or lose, you are sent to the result screen. Here you can restart and go to the title screen.

### Fighters
The fighters looks are predefined, but their names are always randomly generated using `superheroes` node package. Stats are randomly increased for them with each level.


  


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
