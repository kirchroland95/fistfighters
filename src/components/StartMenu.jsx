import React from 'react';
import './StartMenu.css';

function StartMenu({onStartButtonClick}){

    return (
        <div className="start-menu">
          <div className="start-button" onClick={onStartButtonClick}>
            -START-
          </div>
        </div>
      );
    }

  export default StartMenu;