import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesList() {
  const history = useHistory();
  const [localStorageContext, setLocalStorageContext] = useState([]);
  const [filteredValues, setFilteredValues] = useState([]);
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    setLocalStorageContext(JSON.parse(localStorage.getItem('doneRecipes')));
  }, [localStorageContext]);
  useEffect(() => {
    setFilteredValues(localStorageContext);
  }, [filteredValues, localStorageContext]);

  function handleShare(type, id) {
    const url = window.location.href
      .split('/')
      .filter((baseUrl) => baseUrl !== 'receitas-feitas')
      .join('/')
      .concat(`/${type}s/${id}`);
    clipboardCopy(url);
    setIsCopy(true);
  }

  function filterByAll() {
    setFilteredValues(localStorageContext);
    console.log(filteredValues);
  }
  function filterByFood() {
    setFilteredValues(localStorageContext.filter((food) => food.type === 'comida'));
  }
  function filterByDrinks() {
    setFilteredValues(localStorageContext.filter((drinks) => drinks.type === 'bebida'));
  }
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterByAll }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterByFood }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterByDrinks }
      >
        Drinks
      </button>
      { filteredValues.map((recipe, index) => (
        <>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              width="100"
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
          </Link>
          { recipe.type === 'comida' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${recipe.area} - ${recipe.category}` }
            </p>)
            : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { recipe.alcoholicOrNot }
              </p>
            )}
          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipe.doneDate }
          </p>
          <button
            type="button"
            onClick={ () => handleShare(recipe.type, recipe.id) }
          >
            <img
              src={ shareIcon }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {isCopy && (<p>Link copiado!</p>)}
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
