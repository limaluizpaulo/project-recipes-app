import React from 'react';

import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';

import '../css/RecipeDetails.css';

class RecipeInProgress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeDetails: {},
      checked: false,
      // ingredients: [],
    };

    this.getIngredients = this.getIngredients.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    const { meals } = this.props;
    const { match: { params: { comidaId } } } = this.props;
    const { match: { params: { bebidaId } } } = this.props;
    const db = meals ? 'themealdb' : 'thecocktaildb';
    const id = meals ? comidaId : bebidaId;
    console.log(db);
    const URL = `https://www.${db}.com/api/json/v1/1/lookup.php?i=${id}`;
    console.log(URL);
    fetch(URL)
      .then((response) => response.json())
      .then((retorno) => {
        const { meals: comida, drinks } = retorno;
        const recipeDetails = comida || drinks;
        this.setState({ recipeDetails });
      });
  }

  getIngredients() {
    const { recipeDetails, checked } = this.state;
    if (recipeDetails[0]) {
      const chaves = Object.entries(recipeDetails[0]);
      const ingredientes = chaves.filter((key) => (
        key[0].includes('strIngredient') && (key[1] !== null && key[1] !== '')));
      const medidas = chaves.filter((key) => (
        key[0].includes('strMeasure') && (key[1] !== null && key[1] !== ' ')));
      const apenasMedidas = medidas.map((medida) => medida[1]);
      // this.setState({ ingredients: ingredientes });
      return ingredientes.map((ingrediente, index) => {
        if (ingrediente && apenasMedidas[index]) {
          return (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <label
                htmlFor="key"
                className={ ingredientes[index] && checked ? 'checked' : null }
              >
                <input
                  type="checkbox"
                  id="key"
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  defaultChecked={ checked }
                  onClick={ () => this.changeState() }
                />
                {`${ingrediente[1]}-${apenasMedidas[index]}`}
              </label>
            </li>);
        }
        return null;
      });
    }
  }

  changeState() {
    const { checked } = this.state;
    this.setState({
      checked: !checked,
    });
  }

  render() {
    const { recipeDetails } = this.state;
    console.log(recipeDetails);

    return (
      recipeDetails[0] ? (
        <section>
          <div>
            <img
              data-testid="recipe-photo"
              src={ recipeDetails[0].strMealThumb || recipeDetails[0].strDrinkThumb }
              alt={ recipeDetails[0].strMeal || recipeDetails[0].strDrink }
              width="250px"
            />
            <h1 data-testid="recipe-title">
              { recipeDetails[0].strMeal || recipeDetails[0].strDrink }
            </h1>
            <div>
              <span data-testid="recipe-category">
                { recipeDetails[0].strAlcoholic }
              </span>
            </div>
            <button
              data-testid="share-btn"
              type="button"
            >
              <img src={ shareIcon } alt="shareIcon" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
            >
              <img src={ favoriteIcon } alt="favoriteIcon" />
            </button>
            <div>
              <span data-testid="recipe-category">{ recipeDetails[0].strCategory }</span>
            </div>
          </div>
          <div>
            <h4>Ingredientes</h4>
            {this.getIngredients()}
            <ul />
          </div>
          <div>
            <h4>Instruções</h4>
            <p data-testid="instructions">{ recipeDetails[0].strInstructions }</p>
          </div>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </button>

        </section>
      ) : null
    );
  }
}

RecipeInProgress.propTypes = {
  recipeDetails: PropTypes.arrayOf(Object),
  id: PropTypes.string,
}.isRequired;

export default RecipeInProgress;
