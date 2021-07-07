import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import './style/FavoriteRecipes.css';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import { fetchRecipesById } from '../services/recipesAPI';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const {
    redirectToRecipeDetails,
    setRedirectToRecipeDetails,
    lookDetailsRecipe,
    recipeDetails,
  } = useContext(RecipesContext);

  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [allFavoriteRecipes, setAllFavoriteRecipes] = useState([]);
  const [copyLink, setCopyLink] = useState('');
  const [redirectType, setRedirectType] = useState();
  const [idType, setIdType] = useState();

  const updateRecipes = () => {
    const favoriteRecipesLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoriteRecipesLocal);
    setFavoriteRecipes(!favoriteRecipesLocal ? [] : favoriteRecipesLocal);
    setAllFavoriteRecipes(!favoriteRecipesLocal ? [] : favoriteRecipesLocal);
  };

  useEffect(() => {
    updateRecipes();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setRedirectToRecipeDetails(false), []);

  const shareClick = (id, type) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    console.log('Link copiado!', `http://localhost:3000/${type}s/${id}`);
    setCopyLink('Link copiado!');
  };

  const filterByType = (typeFilter) => {
    setFavoriteRecipes(allFavoriteRecipes.filter(({ type }) => type === typeFilter));
  };

  const getAllTypes = () => {
    setFavoriteRecipes(allFavoriteRecipes);
  };

  // retirar get Full
  const getFullRecipe = async (id, type) => {
    setRedirectType(type);
    setIdType(type === 'comida' ? 'idMeal' : 'idDrink');
    const recipe = await fetchRecipesById(id, type === 'comida' ? 'meals' : 'drinks');
    lookDetailsRecipe(recipe);
  };

  const removeFavoriteRecipe = (toRemoveId) => {
    const newRecipes = allFavoriteRecipes.filter(({ id }) => id !== toRemoveId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
    updateRecipes();
  };

  return (
    <div className="favoriteRecipes">
      { redirectToRecipeDetails
        && <Redirect to={ `/${redirectType}s/${recipeDetails[idType]}` } /> }
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
        favoriteRecipes.map((recipe, index) => (
          <div key={ recipe.name }>
            <label key={ index } htmlFor={ recipe.name }>
              <input
                type="radio"
                onClick={ () => getFullRecipe(recipe.id, recipe.type) }
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
            <button
              type="button"
              onClick={ () => removeFavoriteRecipe(recipe.id) }
            >
              <img
                src={ favoriteIcon }
                alt={ `favorite-btn-${index}` }
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>))
      }
    </div>
  );
}
export default FavoriteRecipes;
