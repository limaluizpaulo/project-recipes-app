import React from 'react';

import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';

class RecipeDetails extends React.Component {
  constructor() {
    super();

    this.recomendedRecipes = this.recomendedRecipes.bind(this);
  }

  recomendedRecipes() {
    const { recipeDetails } = this.props;
    const chaves = Object.entries(recipeDetails[0]);
    const recomendadas = chaves.filter((key) => (
      key[0].includes('Alternate')));
    return recomendadas.map((receita, index) => (
      <div key={ index } data-testid={ `${index}-recomendation-card` }>{receita}</div>
    ));
  }

  render() {
    const { recipeDetails, title } = this.props;

    const renderIngredients = (ingredientes, medidas) => (
      ingredientes.map((ingrediente, index) => {
        if (ingrediente && medidas[index]) {
          return (
            <li data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${ingrediente[1]}-${medidas[index]}`}
            </li>);
        }
        return null;
      })
    );

    const getIngredients = () => {
      if (recipeDetails[0]) {
        const chaves = Object.entries(recipeDetails[0]);
        const ingredientes = chaves.filter((key) => (
          key[0].includes('strIngredient') && (key[1] !== null && key[1] !== '')));
        const medidas = chaves.filter((key) => (
          key[0].includes('strMeasure') && (key[1] !== null && key[1] !== ' ')));
        const apenasMedidas = medidas.map((medida) => medida[1]);
        return renderIngredients(ingredientes, apenasMedidas);
      }
    };

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
            <span data-testid="recipe-category">{ recipeDetails[0].strCategory }</span>
          </div>
          <div>
            <h4>Ingredientes</h4>
            {getIngredients()}
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
            <div>
              {this.recomendedRecipes()}
            </div>
          </div>
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            Iniciar Receita
          </button>

        </section>
      ) : null
    );
  }
}

RecipeDetails.propTypes = {
  recipeDetails: PropTypes.arrayOf(Object),
  id: PropTypes.string,
}.isRequired;

export default RecipeDetails;
