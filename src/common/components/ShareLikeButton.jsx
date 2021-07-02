import React, { useState } from 'react';
import shareBtn from '../../images/shareIcon.svg';
import fullHeart from '../../images/blackHeartIcon.svg';
import emptyHeart from '../../images/whiteHeartIcon.svg';

export default function ShareLikeButton() {
  const [linkShare, setLinkShare] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const renderButtons = () => (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          navigator.clipboard.writeText(window.location.href);
          setLinkShare(!linkShare);
        } }
      >
        <img src={ shareBtn } alt="share-icon" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => { setFavorited(!favorited); } }
      >
        <img src={ (favorited) ? fullHeart : emptyHeart } alt="favorite-icon" />
      </button>
    </div>
  );
  return (
    <div>
      {renderButtons()}
      <span className={ !linkShare && 'hideMsg' }>Link copiado!</span>
    </div>
  );
}
