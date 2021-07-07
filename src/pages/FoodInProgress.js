import { indexOf } from 'lodash-es';
import React from 'react';
import favoriteIcon from '../images/blackHeartIcon.svg';
import sharedIcon from '../images/shareIcon.svg';

import testeData from '../testeData';

class BeveragesInProgress extends React.Component {
  constructor() {
    super();

    this.state = {
      detailsRecipe: testeData,
      checkedInputs: false,
    };
    this.renderIngredients = this.renderIngredients.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.setInitialProgress = this.setInitialProgress.bind(this);
  }


  handleChecked({ target }) {
    const li = target.parentNode;
    const ing = li.innerText;
    const { idMeal } = testeData[0];
    const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const notFound = -1;

    if (target.checked === true) li.className = 'checked';
    if (target.checked === false) li.className = '';

    if (prevStorage.meals[idMeal].indexOf(ing) === notFound) {
      prevStorage.meals[idMeal].push(ing);
    } else {
      const pos = prevStorage.meals[idMeal].indexOf(ing);
      prevStorage.meals[idMeal].splice(pos, 1);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(prevStorage));

    this.setInitialProgress(ing);
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
      if (idMeal in prevStorage.meals === false) {
        prevStorage.meals[idMeal] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(prevStorage));
      } 
    }
  }

  // setInitialProgress(ing) {
  //   const { idMeal } = testeData[0];
  //   const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   const notFound = -1;
  //   if (prevStorage.meals[idMeal].length !== 0) {
  //     if (prevStorage.meals[idMeal].indexOf(ing) === notFound) return false;
  //     if (prevStorage.meals[idMeal].indexOf(ing) !== notFound) return true;
  //   }
  // }

  setInitialProgress(ing) {
    console.log('aqui');
    const { idMeal } = testeData[0];
    const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (prevStorage.meals[idMeal]) {
      const targetIng = prevStorage.meals[idMeal].find((name) => name === ing);
      if (targetIng) {
        console.log('true');
        return this.setState({
          checkedInputs: true,

        });
      }
      return this.setState({
        checkedInputs: false,

      });
    }
    return this.setState({
      checkedInputs: false,

    });
  }

  renderIngredients() {
    const { detailsRecipe } = this.state;
    const arrayIngredients = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
      12, 13, 14, 15, 16, 17, 18, 19, 20];
    return arrayIngredients.map((position) => {
      const ingredients = detailsRecipe[0][`strIngredient${position}`];
      const measure = detailsRecipe[0][`strMeasure${position}`];
      const ing = `${measure} ${ingredients}`;
      if (ingredients === '' || ingredients === null) {
        return null;
      }
      return (
        <li
          key={ position }
          data-testid={ `${position - 1}-ingredient-step` }
        >
          <input type="checkbox" checked={ this.state.checkedInputs } onChange={ this.handleChecked } />
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
