import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

import { getRecipesDone } from '../services/helpers/localStorage';
import shareRecipe from '../images/shareIcon.svg';

function DoneRecipesCard() {
  const { selectedTypeItem } = useContext(Context);

  const copyLink = async (data) => {
    await navigator.clipboard.writeText(data);
  };

  useEffect(() => {
    getRecipesDone();
  }, []);

  const recipesIsDone = getRecipesDone();
  const filtredRecipesDone = recipesIsDone
    .filter((recipe) => recipe.type !== selectedTypeItem);
  const zero = 0;
  return (
    <div className="card-my-recipes">
      {filtredRecipesDone.map((recipe, index) => (
        <div key={ index }>
          <div className="card-combined-itens">
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className="card-img-done"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div>
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.type === 'comida'
                  ? `${recipe.area} - ${recipe.category}`
                  : recipe.alcoholicOrNot }
              </span>
            </div>
            <div>
              <button
                type="button"
                onClick={ () => copyLink(`http://localhost:3000/${recipe.type}s/${recipe.id}`) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareRecipe }
                  alt={ recipe.name }
                />
              </button>
              <span id={ `mensage-${recipe.id}` }>
                Link copiado!
              </span>
            </div>
          </div>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
          </Link>
          <div>
            <span>Receita feita em: </span>
            <span
              data-testid={ `${index}-horizontal-done-date` }
            >
              { recipe.doneDate }
            </span>
          </div>
          { recipe.tags.length === zero ? null : (
            <div>
              <button
                type="button"
                data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }
              >
                { recipe.tags[0] }
              </button>
              <button
                type="button"
                data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }
              >
                { recipe.tags[1] }
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipesCard;
