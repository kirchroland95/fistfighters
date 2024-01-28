import React from 'react';

function StartMenu({onStartButtonClick}){

    return <div>
        <h1>FistFighters</h1>
        <button onClick={onStartButtonClick}>Start</button>
        </div>;
  }

  export default StartMenu;