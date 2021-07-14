import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function CardsRecipesDones({ recipesFilter }) {
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
        <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
        { msg && <div>Link copiado!</div> }
        <button type="button" onClick={ () => shareLink(recipe.type, recipe.id) }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Botão de compartilhar"
          />
        </button>
        { recipe.tags !== '' && (
          recipe.tags.map((tag) => (
            <span
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </span>))
        )}
      </div>
    ))
  );
}

export default CardsRecipesDones;
