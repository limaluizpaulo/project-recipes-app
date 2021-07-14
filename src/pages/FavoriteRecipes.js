import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const history = useHistory();
  const favoriteRecepies = JSON.parse(localStorage
    .getItem('favoriteRecipes')) || [];
  const [show, setShow] = useState(false);
  const [newFavoriteRecipies, setNewFavoriteRecipies] = useState(favoriteRecepies);

  async function handleClickClipBoard(type, id) {
    await copy(`http://localhost:3000/${type}s/${id}`).catch(console.log);
    setShow(true);
  }

  function removeFavorite(removeRecipe) {
    const newFavorites = favoriteRecepies
      .filter((recipe) => recipe.id !== removeRecipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setNewFavoriteRecipies(newFavorites);
  }

  function filterFavorites(filterType) {
    if (filterType === 'all') {
      setNewFavoriteRecipies(favoriteRecepies);
    } else if (filterType === 'comidas') {
      setNewFavoriteRecipies(favoriteRecepies
        .filter((recipe) => recipe.type.includes('comida')));
    } else {
      setNewFavoriteRecipies(favoriteRecepies
        .filter((recipe) => recipe.type.includes('bebida')));
    }
  }
  return (

    <div>
      <Header title="Receitas Favoritas" classname="displaynone" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterFavorites('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterFavorites('comidas') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterFavorites('bebidas') }
      >
        Drinks
      </button>

      { newFavoriteRecipies.map((recipe, index) => (
        <div key={ recipe.id } style={ { border: 'solid black 2px' } }>
          <img
            role="presentation"
            data-testid={ `${index}-horizontal-image` }
            style={ { width: '20px' } }
            src={ recipe.image }
            alt={ `Imagem da receita ${recipe.name}` }
            onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
          />
          <p data-testid={ `${index}-horizontal-top-text` } style={ { padding: '20px' } }>
            { recipe.type === 'comida' ? `${recipe.area} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </p>
          <p
            role="presentation"
            onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
            data-testid={ `${index}-horizontal-name` }
            style={ { padding: '20px' } }
          >
            {recipe.name}
          </p>
          <button
            onClick={ () => handleClickClipBoard(recipe.type, recipe.id) }
            type="button"
          >

            <img
              style={ { padding: '20px' } }
              src={ shareIcon }
              alt="Ícone para compartilhar"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>

          {show && (
            <p>Link copiado!</p>
          )}
          <img
            role="presentation"
            src={ blackHeartIcon }
            alt="Ícone para compartilhar"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => removeFavorite(recipe) }
          />
        </div>
      ))}

    </div>
  );
}
