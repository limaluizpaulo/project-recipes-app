import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';

import UserContext from '../context/user.context';
import shareIcon from '../svg/shareIcon.svg';

function ShareButton() {
  const { setWarningMessage } = useContext(UserContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  return (
    <button
      type="button"
      className="button-svg-alt"
      onClick={ () => {
        copy(`http://localhost:3000${pathname}`.replace('/in-progress', ''));
        setWarningMessage('Link copiado!');
      } }
      data-testid="share-btn"
    >
      <img className="svg-small" src={ shareIcon } alt="Share" />
    </button>
  );
}

export default ShareButton;
