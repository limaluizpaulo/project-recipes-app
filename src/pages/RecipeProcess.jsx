import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import '../Style/Progress.css';

const number = 7;

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
      count: 0,
      arrayFinal: [],
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
    const { count } = this.state;
    if (e.target.checked) {
      console.log('if');
      this.setState((state) => ({ count: state.count + 1 }), () => {
        console.log(count);
      });
    } else {
      this.setState((state) => ({ count: state.count - 1 }));
    }
    if (count === number) {
      this.setState({ active: false });
    }
    this.setState((state) => ({ ...state,
      className: 'Risk' }), () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(e.target.checked));
    });
  }

  handleClick() {
    this.setState({ redirect: true });
  }

  async getRecipe() {
    const { match: { params: { id } } } = this.props;
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await result.json();
    this.setState({ recipe: meals }, () => {
      const { recipe } = this.state;
      const ingredientsKeys = Object.entries(recipe);
      const arrayFinal = [];
      ingredientsKeys.forEach((cur) => {
        arrayFinal.push(cur[1].strIngredient1,
          cur[1].strIngredient2,
          cur[1].strIngredient3,
          cur[1].strIngredient4,
          cur[1].strIngredient5,
          cur[1].strIngredient6,
          cur[1].strIngredient7,
          cur[1].strIngredient8);
      });
      this.setState({ arrayFinal });
    });
  }

  render() {
    const { redirect, recipe, className, active, arrayFinal } = this.state;
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
            {/* <p
              className={ className }
              data-testid={ `${index}-ingredient-step` }
            >
              {receita.strIngredient1}
              <input onChange={ this.handleChange } type="checkbox" />
            </p>
            <p
              className={ className }
              data-testid={ `${index}-ingredient-step` }
            >
              {receita.strIngredient2}
              <input onChange={ this.handleChange } type="checkbox" />
            </p>
            <p
              className={ className }
              data-testid={ `${index}-ingredient-step` }
            >
              {receita.strIngredient3}
              <input onChange={ this.handleChange } type="checkbox" />
            </p>
            <p
              className={ className }
              data-testid={ `${index}-ingredient-step` }
            >
              {receita.strIngredient4}
              <input onChange={ this.handleChange } type="checkbox" />
            </p>
            <p
              className={ className }
              data-testid={ `${index}-ingredient-step` }
            >
              {receita.strIngredient5}
              <input onChange={ this.handleChange } type="checkbox" />
            </p>
            <p
              className={ className }
              data-testid={ `${index}-ingredient-step` }
            >
              {receita.strIngredient6}
              <input onChange={ this.handleChange } type="checkbox" />
            </p>
            <p
              className={ className }
              data-testid={ `${index}-ingredient-step` }
            >
              {receita.strIngredient7}
              <input onChange={ this.handleChange } type="checkbox" />
            </p>
            <p
              className={ className }
              data-testid={ `${index}-ingredient-step` }
            >
              {receita.strIngredient8}
              <input onChange={ this.handleChange } type="checkbox" />
            </p> */}
          </div>
        ))}
        {arrayFinal && arrayFinal.map((ing, index) => {
          if (ing === '' || ing === null || ing === undefined) return;
          return (
            <p
              className={ className }
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              {ing}
              <input onChange={ this.handleChange } type="checkbox" />
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
