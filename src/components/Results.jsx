import React from 'react';

function Result({onResultClick}){

    return <div>
        <h1>GameOver</h1>
        <button onClick={onResultClick}>You won/lost, Start again?</button>
        </div>;
  }

  export default Result;