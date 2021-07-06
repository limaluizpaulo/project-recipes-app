import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startRecipe } from '../action';

import Ingredients from '../components/Ingredients';
import '../css/Details.css';
import dictionaryFood from '../help/dictionaryApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class Detalhes extends Component {
  render() {
    const { details, isStart } = this.props;
    return (
      <section>
        <section className="details-header" />
        <section className="recipe-details">
          <img
            data-testid="recipe-photo"
            src=""
            alt=""
          />
        </section>
        <section className="details-content">
          <section className="details-header">
            <div>
              <h2 className="details-title" data-testid="recipe-title">Title</h2>
              <span
                className="details-category"
                data-testid="recipe-category"
              >
                SubTitle
              </span>
            </div>
            <button
              className="details-btn-share"
              type="button"
              data-testid="share-btn"
            >
              <img src={ shareIcon } alt={ shareIcon } />
            </button>
            <button
              className="details-btn-favorite"
              type="button"
              data-testid="favorite-btn"
            >
              <img src={ whiteHeartIcon } alt={ whiteHeartIcon } />
            </button>
          </section>
          <section
            data-testid={
              `${details[dictionaryFood.info.Id]}-ingredient-name-and-measure`
            }
          >
            <h3>Ingredients</h3>
            <span className="details-ingredients">
              <Ingredients data={ details } />
            </span>
          </section>
          <section data-testid="instructions">
            <h3>Instructions</h3>
            <span className="details-intructions-text">
              AQUI FICARÁ AS INSTRUÇÕES
            </span>
          </section>
          <section data-testid="video">
            <h3>Video</h3>
            <section className="video">AQUI FICARÁ O VIDEO</section>
          </section>
          <section
            data-testid={ `${details[dictionaryFood.info.Id]}-recomendation-card` }
          >
            <h3>Recomendadas</h3>
            CARROSEUL
          </section>
          <button
            className="details-btn-startRecipe"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => isStart() }
          >
            Iniciar Receita
          </button>
        </section>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  isStart: () => dispatch(startRecipe()),
});

const mapStateToProps = (state) => ({
  details: state.recipeDetails.details,
});

Detalhes.propTypes = {
  isStart: PropTypes.func.isRequired,
  details: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detalhes);
