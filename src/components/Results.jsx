import React from 'react';

function Result({onResultClick, level}){

    console.log(level);
    return <div>
        <h1>{(level>10) ? 'Congratulations!' : 'Game Over'}</h1>
        <p>{(level>10) ? 'You are the champion!' : 'You lost'}</p>
        <button onClick={onResultClick}>Start again</button>
        </div>;
  }

  export default Result;