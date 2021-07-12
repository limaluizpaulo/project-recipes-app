import React from 'react';
import { PropTypes } from 'prop-types';
import { clearStorageAndPushToLogin } from '../services/manageLocalStorage2';
import exit from '../images/exit.png';

export default function ExitButton( history ) {

  return (
    <button
      type="button"
      className="button-no-border"
      onClick={ () => { clearStorageAndPushToLogin(history); } }
    >
      <img src={ exit } alt="meal icon" width="40" />
    </button>);
}

ExitButton.propTypes = {
  history: PropTypes.shape().isRequired,
};
