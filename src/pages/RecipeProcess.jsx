import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import data from '../data';

import '../Style/Progress.css';

// const URL_RECIPES = 'https://www.themealdb.com/api/json/v1/1/search.php?s';
// const LENGTH_DOZE = 12;
// const messageAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
// const ingredients = [];

class RecipeProcess extends Component {
  constructor(props) {
    super(props);
    console.log('aqui');

    this.state = {
      className: '',
      redirect: false,
      chec: false,
      active: true,
      recipe: [],
      // ingredients: [],
      // response: [],
    };

    this.getRecipe = this.getRecipe.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStorange = this.handleStorange.bind(this);
  }

  componentDidMount() {
    this.getRecipe();
    this.handleStorange();
  }

  handleStorange() {
    const checSave = JSON.parse(localStorage.getItem('inProgressRecipes'));
    this.setState({ chec: checSave });
  }

  handleChange(e) {
    console.log(e.target.checked);
    this.setState((state) => ({ ...state,
      className: 'Risk',
      chec: !state.chec,
      active: !state.active }), () => {
      const { chec } = this.state;
      localStorage.setItem('inProgressRecipes', JSON.stringify(chec));
    });
  }

  handleClick() {
    // console.log('entrou');
    this.setState({ redirect: true });
  }

  async getRecipe() {
    // console.log('aqui getRecipe');
    const { match: { params: { id } } } = this.props;
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await result.json();
    // console.log(meals);
    this.setState({ recipe: meals });
  }

  render() {
    const { redirect, recipe, className, chec, active } = this.state;
    // console.log(recipe);
    const ingredientsKeys = Object.entries(recipe);
    console.log(ingredientsKeys);
    const arrayFinal = [];
    ingredientsKeys.forEach((cur) => {
      console.log(cur);
      arrayFinal.push(cur[1].strIngredient1,
        cur[1].strIngredient2,
        cur[1].strIngredient3,
        cur[1].strIngredient4,
        cur[1].strIngredient5,
        cur[1].strIngredient6,
        cur[1].strIngredient7,
        cur[1].strIngredient8);
    });
    console.log(arrayFinal);
    if (redirect) return <Redirect to="/receitas-feitas" />;
    return (
      <div>
        <h2>Recipe Process</h2>
        {recipe && recipe.map((receita) => (
          <div key={ receita.idMeal }>
            <img
              width="50px"
              data-testid="recipe-photo"
              src={ receita.strMealThumb }
              alt="img"
            />
            <h1 data-testid="recipe-title">{receita.idMeal}</h1>
            <p data-testid="recipe-category">{receita.strCategory}</p>
            <p data-testid="instructions">{receita.strInstructions}</p>
          </div>
        ))}
        {arrayFinal && arrayFinal.map((ing, index) => {
          console.log(ing);
          return (
            <p
              className={ className }
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              {ing}
              <input checked={ chec } onChange={ this.handleChange } type="checkbox" />
            </p>
          );
        })}
        <button data-testid="share-btn" type="button">Compartilhar</button>
        <button data-testid="favorite-btn" type="button">Favoritar</button>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ this.handleClick }
          disabled={ active }
        >
          Finalizar Receita
        </button>
      </div>
    );
  }
}

RecipeProcess.propTypes = {
  match: Proptypes.shape().isRequired,
};

export default RecipeProcess;
