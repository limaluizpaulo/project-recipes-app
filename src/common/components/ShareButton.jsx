import React, { useState } from 'react';
import shareBtn from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareLikeButton() {
  const [linkShare, setLinkShare] = useState(false);

  const renderButtons = () => (
    <button
      type="button"
      onClick={ () => {
        copy(window.location.href.replace('/in-progress', ''));
        setLinkShare(!linkShare);
      } }
    >
      <img
        src={ shareBtn }
        alt="share-icon"
        data-testid="share-btn"
        width="30px"
      />
    </button>
  );
  return (
    <div>
      {renderButtons()}
      <div className={ !linkShare ? 'hideMsg' : 'showMsg' }>Link copiado!</div>
    </div>
  );
}
