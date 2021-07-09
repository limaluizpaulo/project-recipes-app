import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import UserContext from '../context/user.context';
import shareIcon from '../svg/shareIcon.svg';

function ShareButton({ url }) {
  const { setWarningMessage } = useContext(UserContext);

  return (
    <button
      type="button"
      className="svg-button-alt"
      onClick={ () => {
        copy(url);
        setWarningMessage('Link copiado!');
      } }
    >
      <img
        className="svg-small"
        src={ shareIcon }
        alt="Share"
      />
    </button>
  );
}

ShareButton.propTypes = {
  url: PropTypes.string,
}.isRequired;

export default ShareButton;
