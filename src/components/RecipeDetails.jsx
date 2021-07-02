import React from 'react';

import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';

class RecipeDetails extends React.Component {
  render() {
    const { recipeDetails, title } = this.props;

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
                  title={ recipeDetails[0].strMeal || recipeDetails[0].strDrink }
                  src={ recipeDetails[0].strYoutube }
                />
              </div>)}
          <div>
            <h4>Recomendadas</h4>
            {/*
            <div data-testid={ `${index}-recomendation-card` }>Carrosel de cards</div> */}
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
