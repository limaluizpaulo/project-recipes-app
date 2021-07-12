import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHearticon from '../images/whiteHeartIcon.svg';
import blackHearticon from '../images/blackHeartIcon.svg';

function ShareFavoriteBtm({ url }) {
  const [share, setShare] = useState(false);
  const [favorite, setFavorite] = useState(true);

  const headleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => navigator.clipboard.writeText(`http://localhost:3000${url}`) && setShare(true) }
        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt="Copiar Link"
        />
      </button>
      {share ? <p>Link copiado!</p> : null}
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ headleFavorite }
      >
        <img
          src={ favorite ? whiteHearticon : blackHearticon }
          alt="Favoritar"
        />
      </button>
    </div>
  );
}

ShareFavoriteBtm.propTypes = {
  match: PropTypes.object,
}.isrequired;

export default ShareFavoriteBtm;
