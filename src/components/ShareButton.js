import React from 'react';
import copy from 'clipboard-copy';

import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  return (
    <button
      type="button"
      className="button-svg"
      onClick={ () => {
        copy(`http://localhost:3000${pathname}`);
        invokeAlert('Link copiado!');
      } }
      data-testid="share-btn"
    >
      <img src={ shareIcon } alt="Compartilhar" />
    </button>
  );
}

export default ShareButton;
