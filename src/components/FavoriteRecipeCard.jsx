import React from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const FavoriteRecipeCard = ({ favoriteRecipes, index, setFavoriteRecipes }) => {
  const filterElementFromStorage = (event, id) => {
    event.preventDefault();
    // https://developer.mozilla.org/pt-BR/docs/Web/API/Event/preventDefault
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newElements = favorites.filter((item) => item.id !== id);
    setFavoriteRecipes(newElements);
  };

  const copyLink = (id, type) => {
    if (type === 'bebida') {
      copy(`http://localhost:3000/bebidas/${id}`);
      document.getElementById('link').style = 'inline';
    } else {
      copy(`http://localhost:3000/comidas/${id}`);
      document.getElementById('link').style = 'inline';
    }
  };

  const { id, type, area, category, alcoholicOrNot, name, image } = favoriteRecipes;

  return (
    <div data-testid={ `${index}-recipe-card` }>
      {type === 'bebida' ? (
        <Link
          to={ `/bebidas/${id}` }
        >
          <img
            className="img-fluid"
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        </Link>
      ) : (
        <Link
          to={ `/comidas/${id}` }
          src={ image }
        >
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        </Link>
      )}
      {type === 'bebidas' ? (
        <p data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot }
        </p>
      ) : (
        <p data-testid={ `${index}-horizontal-top-text` }>
          {`${area} - ${category}`}
        </p>
      )}
      <button
        src={ blackHeartIcon }
        type="button"
        onClick={ (event) => filterElementFromStorage(event, id) }
      >
        <img
          src={ blackHeartIcon }
          data-testid={ `${index}-horizontal-favorite-btn` }
          alt="Favoritar/Desfavoritar"
        />
      </button>
      <button
        type="button"
        onClick={ () => copyLink(id, type) }
      >
        <img
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          alt="Compartilhar receita"
        />
      </button>
      <p id="link">Link copiado!</p>
    </div>
  );
};

FavoriteRecipeCard.propTypes = {
  favoriteRecipes: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  setFavoriteRecipes: PropTypes.func.isRequired,
};

export default FavoriteRecipeCard;
