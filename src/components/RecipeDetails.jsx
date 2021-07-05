import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';

import RecomendedCard from './RecomendedCard';

class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectInProgress: false,
    };

    this.getIngredients = this.getIngredients.bind(this);
  }

  getIngredients() {
    const { recipeDetails } = this.props;
    if (recipeDetails[0]) {
      const chaves = Object.entries(recipeDetails[0]);
      const ingredientes = chaves.filter((key) => (
        key[0].includes('strIngredient') && (key[1] !== null && key[1] !== '')));
      const medidas = chaves.filter((key) => (
        key[0].includes('strMeasure') && (key[1] !== null && key[1] !== ' ')));
      const apenasMedidas = medidas.map((medida) => medida[1]);
      return ingredientes.map((ingrediente, index) => {
        if (ingrediente && apenasMedidas[index]) {
          return (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${ingrediente[1]}-${apenasMedidas[index]}`}
            </li>);
        }
        return null;
      });
    }
  }

  render() {
    const { recipeDetails, title, recipes } = this.props;
    const { redirectInProgress } = this.state;

    if (redirectInProgress) {
      const { foodById, drinksById } = this.props;

      if (foodById.length !== 0 && drinksById.length === 0) {
        return <Redirect to={ `/comidas/${foodById[0].idMeal}/in-progress` } />;
      }
      return <Redirect to={ `/bebidas/${drinksById[0].idDrink}/in-progress` } />;
    }

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
          {title === 'Bebidas' ? null
            : (
              <div>
                <h4>Video</h4>
                <iframe
                  data-testid="video"
                  title={ recipeDetails[0].strMeal || recipeDetails[0].strDrink }
                  src={ recipeDetails[0].strYoutube }
                />
              </div>)}
          <div>
            <h4>Recomendadas</h4>
            <div className="card-list">
              <RecomendedCard recipes={ recipes } />
            </div>
          </div>
          <div>
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => this.setState({ redirectInProgress: true }) }
              className="button"
            >
              Iniciar Receita
            </button>
          </div>
        </section>
      ) : null
    );
  }
}

const mapStateToProps = (state) => ({
  foodById: state.food.foodById,
  drinksById: state.drink.drinkById,
});

RecipeDetails.propTypes = {
  recipeDetails: PropTypes.arrayOf(Object),
  id: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(RecipeDetails);
