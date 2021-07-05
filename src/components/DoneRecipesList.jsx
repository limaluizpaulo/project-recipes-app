import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesList() {
  const history = useHistory();
  const [localStorageContext, setLocalStorageContext] = useState([]);
  useEffect(() => {
    setLocalStorageContext(JSON.parse(localStorage.getItem('doneRecipes')));
  }, [localStorageContext]);

  useEffect(() => {

  });
  return (
    <div>
      { localStorageContext.map((recipe, index) => (
        <>
          <button
            type="button"
            onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
          >
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </button>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
          </Link>
          { recipe.type === 'comida' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.category }
              { recipe.area }
            </p>)
            : (
              <p>
                { recipe.alcoholicOrNot }
              </p>
            )}
          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipe.doneDate }
          </p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img
              src={ shareIcon }
              alt={ recipe.name }
            />
          </button>
          { recipe.type === 'comida' && recipe.tags.map((tag) => (
            <p
              key={ index }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </p>
          ))}
        </>
      )) }
    </div>
  );
}

export default DoneRecipesList;
