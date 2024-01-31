import React from 'react';

function Result({ onResultClick, level }) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '2em', color: level > 10 ? '#4CAF50' : '#ff0049' }}>
          {level > 10 ? 'Congratulations!' : 'Game Over'}
        </h1>
        <p style={{ fontSize: '1.5em', color: level > 10 ? '#32CD32' : '#ff0049' }}>
          {level > 10 ? 'You are the champion!' : 'You lost'}
        </p>
        <button
          style={{
            backgroundColor: level > 10 ? '#4CAF50' : '#ff0049',
            color: 'white',
            padding: '15px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1.2em',
          }}
          onClick={onResultClick}
        >
          Start again
        </button>
      </div>
    );
  }

  export default Result;