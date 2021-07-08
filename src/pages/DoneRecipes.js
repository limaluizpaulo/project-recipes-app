import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import RecipesContext from '../context/RecipesContext';

import shareIcon from '../images/shareIcon.svg';
import './style/DoneRecipes.css';
// import { fetchRecipesById } from '../services/recipesAPI';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const {
    redirectToRecipeDetails,
    setRedirectToRecipeDetails,
    lookDetailsRecipe,
  } = useContext(RecipesContext);

  const [copyLink, setCopyLink] = useState('');
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState();
  const [redirectType, setRedirectType] = useState();
  const [recipeId, setRecipeId] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setRedirectToRecipeDetails(false), []);

  useEffect(() => {
    const doneRecipesLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(!doneRecipesLocal ? [] : doneRecipesLocal);
    setAllRecipes(!doneRecipesLocal ? [] : doneRecipesLocal);
  }, []);

  const shareClick = (id, type) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    console.log('Link copiado!', `http://localhost:3000/${type}s/${id}`);
    setCopyLink('Link copiado!');
  };

  const filterByType = (typeFilter) => {
    setDoneRecipes(allRecipes.filter(({ type }) => type === typeFilter));
  };

  const getAllTypes = () => {
    setDoneRecipes(allRecipes);
  };

  // retirar get Full
  const selectRecipe = (recipe) => {
    setRedirectType(recipe.type);
    setRecipeId(recipe.id);
    console.log(recipe);
    lookDetailsRecipe(recipe);
  };

  return (
    <div className="doneRecipes">
      { redirectToRecipeDetails
        && <Redirect to={ `/${redirectType}s/${recipeId}` } /> }
      <button
        type="button"
        onClick={ getAllTypes }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => filterByType('comida') }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        onClick={ () => filterByType('bebida') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      <br />
      { copyLink && <p>{ copyLink }</p> }
      <br />
      {
        doneRecipes.map((recipe, index) => (
          <div key={ recipe.name }>
            <label key={ index } htmlFor={ recipe.name }>
              <input
                type="radio"
                onClick={ () => selectRecipe(recipe) }
                id={ recipe.name }
                className="goToDetail"
              />
              <img
                src={ recipe.image }
                alt={ recipe.name }
                className="imgCard"
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </label>
            {
              recipe.area && (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.area} - ${recipe.category}`}
                </p>
              )
            }
            { recipe.alcoholicOrNot
              && (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.alcoholicOrNot}
                </p>) }
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              type="button"
              onClick={ () => shareClick(recipe.id, recipe.type) }
            >
              <img
                src={ shareIcon }
                alt={ `share-btn-${index}` }
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            { recipe.type === 'comida' && recipe.tags.slice(0, 2).map((tagName) => (
              <p
                key={ tagName }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </p>
            )) }
          </div>))
      }
    </div>
  );
}
export default DoneRecipes;
