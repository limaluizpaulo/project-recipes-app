import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Embed from 'react-embed';
import '../Style/RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: [],
      drinks: [],
      redirect: false,
      favoriteRecipes: [],
      heart: whiteHeartIcon,
    };
    this.getRecipe = this.getRecipe.bind(this);
    this.getDrinks = this.getDrinks.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getLocalStoreFavorites = this.getLocalStoreFavorites.bind(this);
    this.handleClickFavorite = this.handleClickFavorite.bind(this);
  }

  componentDidMount() {
    this.getRecipe();
    this.getDrinks();
    const favorite = localStorage.getItem('favoriteRecipes');
    if (favorite) {
      this.getLocalStoreFavorites(JSON.parse(favorite).newFavorite);
    }
  }

  handleClick() {
    this.setState({ redirect: true });
  }

  handleClickFavorite() {
    const { heart, favoriteRecipes, recipe } = this.state;
    const newFavorite = [...favoriteRecipes];
    const {
      strMealThumb,
      idMeal,
      strArea,
      strMeal,
      strCategory,
    } = recipe;
    const modelo = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    if (heart === whiteHeartIcon) {
      this.setState({ heart: blackHeartIcon },
        () => {
          newFavorite.push(modelo);
          this.setState({ favoriteRecipes: newFavorite },
            () => {
              localStorage.setItem('favoriteRecipes', JSON.stringify({ newFavorite }));
            });
        });
    } else {
      this.setState({ heart: whiteHeartIcon },
        () => {
          const teste = favoriteRecipes.filter((model) => model.id !== recipe.idMeal);
          this.setState({ favoriteRecipes: teste },
            () => {
              localStorage.setItem('favoriteRecipes', JSON.stringify({ teste }));
            });
        });
    }
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

  getLocalStoreFavorites(favorite) {
    this.setState({ favoriteRecipes: favorite });
  }

  render() {
    const { recipe, drinks, redirect, favoriteRecipes, heart } = this.state;
    const { match: { params: { id } } } = this.props;
    if (redirect) {
      return <Redirect to={ `/comidas/${id}/in-progress` } />;
    }
    if (recipe.length === 0) {
      return <h2>Loading...</h2>;
    }
    console.log(favoriteRecipes);
    console.log(recipe);
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
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ this.handleClickFavorite }
        >
          <img className="icons" src={ heart } alt="whiteHeartIcon" />
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
