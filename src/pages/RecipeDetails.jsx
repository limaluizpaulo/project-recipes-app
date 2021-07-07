import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Embed from 'react-embed';
import '../Style/RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: [],
      drinks: [],
      redirect: false,
    };
    this.getRecipe = this.getRecipe.bind(this);
    this.getDrinks = this.getDrinks.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getRecipe();
    this.getDrinks();
    console.log('didmount');
  }

  handleClick() {
    this.setState({ redirect: true });
  }

  async getRecipe() {
    const { match: { params: { id } } } = this.props;
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await result.json();
    this.setState({ recipe: meals[0] });
  }

  async getDrinks() {
    const LENGTH_SEIS = 6;
    const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await result.json();
    const listDrinks = drinks.slice(0, LENGTH_SEIS);
    this.setState({ drinks: listDrinks });
  }

  render() {
    const { recipe, drinks, redirect } = this.state;
    const { match: { params: { id } } } = this.props;
    if (redirect) {
      return <Redirect to={ `/comidas/${id}/in-progress` } />;
    }
    if (recipe.length === 0) {
      return <h2>Loading...</h2>;
    }
    const ingredientsKeys = Object.entries(recipe);
    const ingredients = [];
    const measures = [];

    ingredientsKeys.forEach((key) => {
      if (key[0].includes('strIngredient') && key[1] !== null && key[1] !== '') {
        ingredients.push(key[1]);
      }
    });
    ingredientsKeys.forEach((key) => {
      if (key[0].match('strMeasure') && key[1] !== null && key[1] !== '') {
        measures.push(key[1]);
      }
    });
    console.log(measures);
    const finalList = [];
    for (let i = 0; i <= (ingredients.length - 1); i += 1) {
      if (measures[i] === undefined) {
        finalList.push(ingredients[i]);
      } else {
        finalList.push(`${measures[i]} - ${ingredients[i]}`);
      }
    }
    const {
      strMealThumb,
      idMeal,
      strMeal,
      strCategory,
      strYoutube,
      strInstructions } = recipe;
    return (
      <div>
        <img
          className="recipeImg"
          src={ strMealThumb }
          alt={ idMeal }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">{strMeal}</h2>
        <button type="button" data-testid="share-btn">
          <img className="icons" src={ shareIcon } alt="shareButton" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img className="icons" src={ whiteHeartIcon } alt="whiteHeartIcon" />
        </button>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        <div>
          <h2>Ingredients</h2>
          <ul>
            {finalList.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {ingredient}
              </li>))}
          </ul>
        </div>
        <h3>Instructions</h3>
        <p data-testid="instructions">
          {strInstructions}
        </p>
        <iframe
          data-testid="video"
          src={ strYoutube }
          title="This is a unique title"
        />

        <h3>Receitas Recomendadas</h3>
        <div
          className="recomendation-List"
        >
          {drinks.map((drink, index) => (
            <div
              className="card-drink"
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="img-recommed-drink"
                src={ drink.strDrinkThumb }
                alt={ index }
              />
              <span data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</span>
            </div>
          ))}
        </div>
        <button
          className="button"
          onClick={ this.handleClick }
          type="button"
          data-testid="start-recipe-btn"
        >
          iniciar receita
        </button>
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,

};
export default RecipeDetails;
