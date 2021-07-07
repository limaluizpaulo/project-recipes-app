import React from 'react';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function favButton() {
  if (page === 'comidas') {
    const redirection = () => {
      const inProgressRecipes = {
        meals: {
          [item.idMeal]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    };
    if (localStorage.inProgressRecipes) {
      const recipes = JSON.parse(localStorage.inProgressRecipes);
      const inProgress = Object.keys(recipes)
        .map((key) => Object.keys(recipes[key]).includes(item.idMeal));
      if (inProgress.includes(true)) {
        btnName = 'Continuar Receita';
      }
    }
    return (
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favorite icon" />
      </button>
    );
  }
  if (page === 'bebidas') {
    const redirection = () => {
      const inProgressRecipes = {
        drinks: {
          [item.idDrink]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    };
    if (localStorage.inProgressRecipes) {
      const recipes = JSON.parse(localStorage.inProgressRecipes);
      const inProgress = Object.keys(recipes)
        .map((key) => Object.keys(recipes[key]).includes(item.idDrink));
      if (inProgress.includes(true)) {
        btnName = 'Continuar Receita';
      }
    }
    return (
      <button
        className="btn btn-info"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ redirection }
      >
        {btnName}
      </button>
    );
  }
}

export default favButton;
