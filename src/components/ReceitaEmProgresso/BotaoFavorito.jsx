import { shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import isFavoriteIcon from '../../images/blackHeartIcon.svg';
import isNotFavoriteIcon from '../../images/whiteHeartIcon.svg';
import { addFavoriteRecipes,
  haveFavoriteRecipes, removeFavoriteRecipes } from '../../services/localStorage';

function BotaoFavorito({ receita }) {
  const [favorito, setFavorito] = useState(null);

  useEffect(() => {
    const { type, id } = receita;
    if (id !== '') {
      const temReceitaFavorita = haveFavoriteRecipes(type, id);
      setFavorito(temReceitaFavorita);
    }
  }, [receita]);

  const handleClick = () => {
    const { id, type, area, category, alcoholicOrNot, name, image } = receita;
    if (favorito) {
      setFavorito(false);
      removeFavoriteRecipes(type, id);
    } else {
      setFavorito(true);
      addFavoriteRecipes({
        id,
        type,
        area,
        category,
        alcoholicOrNot,
        name,
        image,
      });
    }
  };

  return (
    <button type="button" className="button-transparent" onClick={ handleClick }>
      {favorito !== null && <img
        data-testid="favorite-btn"
        src={ ((favorito) ? isFavoriteIcon : isNotFavoriteIcon) }
        alt="favorite-icon"
      />}
    </button>
  );
}

BotaoFavorito.propTypes = {
  receita: shape({
    id: string,
    type: string,
    area: string,
    category: string,
    alcoholicOrNot: string,
    name: string,
    image: string,
  }).isRequired,
};

export default BotaoFavorito;
