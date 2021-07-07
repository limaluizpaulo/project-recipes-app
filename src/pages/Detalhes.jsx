import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startRecipe } from '../action';

import Ingredients from '../components/Ingredients';
import '../css/Details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class Detalhes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favIcon: false,
      favIconColor: whiteHeartIcon,
    };
    this.handleFavClick = this.handleFavClick.bind(this);
  }

  handleFavClick() {
    const { favIcon } = this.state;
    if (!favIcon) {
      this.setState({
        favIconColor: blackHeartIcon,
        favIcon: true,
      });
    }
    if (favIcon) {
      this.setState({
        favIconColor: whiteHeartIcon,
        favIcon: false,
      });
    }
  }

  render() {
    const { isStart, details } = this.props;
    const ingredientsNumber = 5550;
    const recomendationCardNumber = 550;
    const { favIconColor } = this.state;
    return (
      <section>
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
              onClick={ this.handleFavClick }
            >
              <img src={ favIconColor } alt={ favIconColor } />
            </button>
          </section>
          <section data-testid={ `${ingredientsNumber}-ingredient-name-and-measure` }>
            <h3>Ingredients</h3>
            <span className="details-ingredients">
              <Ingredients data={ details } />
            </span>
          </section>
          <section data-testid="instructions">
            <h3>Instructions</h3>
            <
            <span className="details-intructions-text">
              AQUI FICARÁ AS INSTRUÇÕES
            </span>
          </section>
          <section data-testid="video">
            <h3>Video</h3>
            <section className="video">AQUI FICARÁ O VIDEO</section>
          </section>
          <section data-testid={ `${recomendationCardNumber}-recomendation-card` }>
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
