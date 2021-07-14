import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import FavoriteBtn from './FavoriteBtn';

function CardsRecipesFavorites({ recipesFilter }) {
  const [msg, setMsg] = useState(false);

  const shareLink = (type, id) => {
    if (type === 'comida') {
      copy(`http://localhost:3000/comidas/${id}`);
    } else {
      copy(`http://localhost:3000/bebidas/${id}`);
    }

    setMsg(true);

    const TWO_SECONDS = 2000;
    setTimeout(() => {
      setMsg(false);
    }, TWO_SECONDS);
  };

  return (
    recipesFilter.map((recipe, index) => (
      <div key={ recipe }>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <img
            style={ { width: 200 } }
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt="Imagem da receita"
          />
        </Link>
        {
          recipe.alcoholicOrNot !== ''
          && (
            <span data-testid={ `${index}-horizontal-top-text` }>
              { recipe.alcoholicOrNot }
            </span>)
        }
        {
          recipe.area !== ''
          && (
            <span data-testid={ `${index}-horizontal-top-text` }>
              { recipe.area }
              { ' - ' }
              { recipe.category }
            </span>)
        }
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
        </Link>
        { msg && <div>Link copiado!</div> }
        <button type="button" onClick={ () => shareLink(recipe.type, recipe.id) }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Botão de compartilhar"
          />
        </button>
        <FavoriteBtn  id={ recipe.id } />
      </div>
    ))
  );
}

export default CardsRecipesFavorites;
