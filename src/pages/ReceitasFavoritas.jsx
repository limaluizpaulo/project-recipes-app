import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ReceitasFavoritas() {
  const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [newRecipes, setNewRecipes] = useState(recipesFavorite);
  const [msg, setMsg] = useState(false);

  ReceitasFavoritas.displayName = 'Receitas Favoritas';

  if (recipesFavorite === null) {
    const favoriteRecipes = [];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setNewRecipes(favoriteRecipes);
  }

  const btnAll = () => {
    setNewRecipes(recipesFavorite);
  };

  const btnFood = () => {
    setNewRecipes(recipesFavorite.filter((recipe) => recipe.type === 'comida'));
  };

  const btnDrinks = () => {
    setNewRecipes(recipesFavorite.filter((recipe) => recipe.type === 'bebida'));
  };

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

  const favoriteBtn = (id) => {
    const desfavoritar = newRecipes.filter((res) => res.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(desfavoritar));
    setNewRecipes(desfavoritar);
  };

  return (
    <div>
      <Header title={ ReceitasFavoritas.displayName } />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ btnAll }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ btnFood }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ btnDrinks }
        >
          Drinks
        </button>
      </section>
      { newRecipes !== null && (
        newRecipes.map((recipe, index) => (
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
                  { recipe.alcoholicOrNot}
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
            <button type="button" onClick={ () => favoriteBtn(recipe.id) }>
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                type="button"
                src={ blackHeartIcon }
                alt="botão de favoritar"
              />
            </button>
          </div>
        )))}
    </div>
  );
}

export default ReceitasFavoritas;
