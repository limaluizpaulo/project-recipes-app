import React from 'react';
import exit from '../images/exit.png';

export default function ExitButton() {
  return (
    <button
      type="button"
      className="button-no-border"
      onClick={ () => { localStorage.clear(); } }
    >
      <img src={ exit } alt="meal icon" width="40" />
    </button>);
}
