import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import { changeFavoritStatus } from '../storage/localStorage';

export default function CardFavorit({ mealOrDrink, index }) {
  const [favorit, setFavorit] = useState({ status: true, imagem: blackHeartIcon });
  const {
    id,
    type,
    image,
    name,
    area,
    alcoholicOrNot,
    category,
    doneDate,
    tags } = mealOrDrink;

  function handleFavorite() {
    setFavorit((prevState) => ({ status: !favorit.status,
      imagem: prevState.imagem === blackHeartIcon ? whiteHeartIcon : blackHeartIcon }));
    changeFavoritStatus(mealOrDrink);
  }

  async function handleShare() {
    return global.alert('Link copiado!');
  }

  return (
    <div data-testid={ `${index}-horizontal-card` }>
      <Link
        to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }
      >
        <img
          width="150px"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
      </Link>

      <p data-testid={ `${index}-horizontal-top-text` }>
        {type === 'bebida' ? `${category} - ${alcoholicOrNot}` : `${area} - ${category}` }
      </p>

      <Link
        to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }
      >
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>

      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>

      <Button onClick={ handleShare }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt={ name }
        />
      </Button>

      <Button onClick={ handleFavorite }>
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ favorit.imagem }
          alt={ name }
        />
      </Button>

      {typeof tags === 'object' && tags.length > 0
        ? tags.map((tag, i) => (
          <p
            data-testid={ `${index}-${tag}-horizontal-tag` }
            key={ `${i} - ${tag}` }
          >
            {tag}
          </p>

        ))
        : <p data-testid={ `${index}-${tags}-horizontal-tag` }>{tags}</p>}

    </div>
  );
}

CardFavorit.propTypes = {
  mealOrDrink: PropTypes.shape(Object).isRequired,
  index: PropTypes.number.isRequired,
};
