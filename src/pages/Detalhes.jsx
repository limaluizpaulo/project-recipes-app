import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../css/Details.css';

class Detalhes extends Component {
  render() {
    const { mealsDetails: {
      idMeal,
      strMealThumb,
      strMeal,
      strCategory,
      strInstructions,
    } } = this.props;
    return (
      <section className="recipe-details">
        <img
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt={ strMeal }
        />
        <h2 data-testid="recipe-title">{strMeal}</h2>
        <span
          lassName="details-category"
          data-testid="recipe-category"
        >
          {strCategory}
        </span>
        <button
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
        <section data-testid={ `${idMeal}-ingredient-name-and-measure` }>
          <h3>Ingredients</h3>
          <span className="details-ingredients">
            AQUI FICARÁ OS IGREDIENTES
          </span>
        </section>
        <section data-testid="instructions">
          <h3>Instructions</h3>
          <span className="details-intructions-text">
            { strInstructions }
          </span>
        </section>
        <section data-testid="video">
          <h3>Video</h3>
          <section className="video">AQUI FICARÁ O VIDEO</section>
        </section>
        <section data-testid={ `${idMeal}-recomendation-card` } />
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  mealsDetails: state.foodCategories.recipeDetails,
});

Detalhes.propTypes = {
  idMeal: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  mealsDetails: PropTypes.shape.isRequired,
  strInstructions: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Detalhes);
