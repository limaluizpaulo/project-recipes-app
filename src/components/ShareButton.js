import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import UserContext from '../context/user.context';
import shareIcon from '../svg/shareIcon.svg';

function ShareButton({ index, url }) {
  const { setWarningMessage } = useContext(UserContext);

  return (
    <button
      type="button"
      className="button-svg-alt"
      onClick={ () => {
        copy(url);
        setWarningMessage('Link copiado!');
      } }
      data-testid="share-btn"
    >
      <img
        className="svg-small"
        src={ shareIcon }
        alt="Share"
        data-testid={ `${index}-horizontal-share-btn` }
      />
    </button>
  );
}

ShareButton.propTypes = {
  dataTestId: PropTypes.string,
}.isRequired;

export default ShareButton;
