import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Context from '../context/Context';
import 'react-toastify/dist/ReactToastify.css';
import { getRecipesFavorites } from '../services/helpers/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipesCard() {
  const { selectedTypeItem } = useContext(Context);
  const copyLink = async ({ target }, data) => {
    await navigator.clipboard.writeText(data);
    const { id } = target;
    const divButtonsGet = document.getElementById(`${id}-div-buttons`);
    const messageExist = document.getElementById(`${id}-message-span`);
    if (!messageExist) {
      const spamFromMessage = document.createElement('div');
      spamFromMessage.id = `${id}-message-span`;
      spamFromMessage.textContent = 'Link copiado!';
      divButtonsGet.appendChild(spamFromMessage);
    } else {
      messageExist.remove();
    }
  };

  const getFromLocalStorage = (key) => {
    const resFromLocalStorage = localStorage.getItem(key);
    return JSON.parse(resFromLocalStorage);
  };

  const setOnLocalStorage = (value) => {
    let itemToBeStored = value;
    if (typeof value === 'object') itemToBeStored = JSON.stringify(value);
    localStorage.setItem('favoriteRecipes', itemToBeStored);
  };

  const removeFromLocalStorage = (value) => {
    const itemStored = getFromLocalStorage('favoriteRecipes');
    const newItemsToBeStored = itemStored.filter(({ id }) => id !== value.id);
    setOnLocalStorage(newItemsToBeStored);
  };

  const favoriteRecipe = ({ target }, value) => {
    const { className, id } = target;
    if (!className) {
      target.className = 'favorited-recipe';
    } else {
      const idFound = id.split('-')[0];
      const recipeFromRemove = document.getElementById(`${idFound}-recipe-div`);
      recipeFromRemove.remove();
      removeFromLocalStorage(value);
    }
  };
  useEffect(() => {
    getRecipesFavorites();
  }, []);
  let recipesIsFavorite = getRecipesFavorites();
  if (!recipesIsFavorite) recipesIsFavorite = [];
  const filtredRecipesDone = recipesIsFavorite
    .filter((recipe) => recipe.type !== selectedTypeItem);
  return (
    <>
      <ToastContainer />
      {filtredRecipesDone.map((recipe, index) => (
        <div
          key={ index }
          className="card-recipes"
          id={ `${index}-recipe-div` }
        >
          <div className="class-image">
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className="card-img-done"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
          </div>
          <div
            className="class-items"
            id={ `${index}-div-buttons` }
          >
            <div className="card-combined-itens">
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.type === 'comida'
                  ? `${recipe.area} - ${recipe.category}`
                  : recipe.alcoholicOrNot }
              </span>
            </div>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h5 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h5>
            </Link>
            <div
              className="buttons-tags"
            >
              <button
                type="button"
                onClick={ (event) => copyLink(event, `http://localhost:3000/${recipe.type}s/${recipe.id}`) }
              >
                <img
                  id={ index }
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt={ recipe.name }
                />
              </button>
              <button
                type="button"
                onClick={ (event) => favoriteRecipe(event, recipe) }
              >
                <img
                  id={ `${index}-favorite-img` }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt={ recipe.name }
                  className="favorited-recipe"
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
