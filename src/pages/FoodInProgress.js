import React from 'react';
import favoriteIcon from '../images/blackHeartIcon.svg';
import sharedIcon from '../images/shareIcon.svg';

import testeData from '../testeData';

class BeveragesInProgress extends React.Component {
  constructor() {
    super();

    this.state = {
      detailsRecipe: testeData,
    };
    this.renderIngredients = this.renderIngredients.bind(this);
  }

  handleChecked({ target }) {
    const li = target.parentNode;
    localStorage.setItem('valor', 'teste');
    if (target.checked === true) li.className = 'checked';
    if (target.checked === false) li.className = '';
  }

  setInitialLocal() {
    const { idMeal } = testeData[0];
    if (localStorage.getItem('inProgressRecipes') === null) {
      const obj = {
        cocktails: {
          id: [],
        },
        meals: {
          [idMeal]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    } else {
      const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      // prevStorage.meals[idMeal].push('teste');
    }
  }

  renderIngredients() {
    const { detailsRecipe } = this.state;
    const arrayIngredients = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
      12, 13, 14, 15, 16, 17, 18, 19, 20];
    return arrayIngredients.map((position) => {
      const ingredients = detailsRecipe[0][`strIngredient${position}`];
      const measure = detailsRecipe[0][`strMeasure${position}`];
      if (ingredients === '' || ingredients === null) {
        return null;
      }
      return (
        <li
          key={ position }
          data-testid={ `${position - 1}-ingredient-step` }
        >
          <input type="checkbox" onChange={ this.handleChecked } />
          { `${measure} ${ingredients}` }
        </li>
      );
    });
  }

  render() {
    const { detailsRecipe } = this.state;
    return (
      <section>
        { this.setInitialLocal() }
        <img
          src={ detailsRecipe[0].strMealThumb }
          alt="Imagem da Bebida"
          data-testid="recipe-photo"
          width="350"
        />
        <h1 data-testid="recipe-title">{detailsRecipe[0].strMeal}</h1>
        <img src={ favoriteIcon } alt="Favoritar Bebida" data-testid="favorite-btn" />
        <img src={ sharedIcon } alt="Favoritar Bebida" data-testid="favorite-btn" />
        <p data-testid="recipe-category">
          {`Categoria: ${detailsRecipe[0].strCategory}`}
        </p>
        <p
          data-testid="instructions"
        >
          {`Instrução: ${detailsRecipe[0].strInstructions}`}
        </p>
        <h3>Ingredientes</h3>
        <ul>
          {this.renderIngredients()}
        </ul>

        <button data-testid="finish-recipe-btn" type="button">Finalizar receita</button>
      </section>
    );
  }
}

export default BeveragesInProgress;
