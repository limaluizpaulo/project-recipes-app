import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDrinkDetails, fetchFoodDetails, startRecipe } from '../action';

import Ingredients from '../components/Ingredients';
import '../css/Details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Instructions from '../components/Instructions';

class Detalhes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favIcon: false,
      favIconColor: whiteHeartIcon,
    };
    this.handleFavClick = this.handleFavClick.bind(this);
  }

  componentDidMount() {
    const { match: { params: { page, id } }, foodDetails, drinksDetails } = this.props;
    if (page === 'comidas') {
      return foodDetails(id);
    }
    return drinksDetails(id);
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
          <section>
            <h3>Ingredients</h3>
            <span className="details-ingredients">
              <Ingredients data={ details } />
            </span>
          </section>
          <section data-testid="instructions">
            <h3>Instructions</h3>
            <span className="details-intructions-text">
              <Instructions data={ details } />
            </span>
          </section>
          <section data-testid="video">
            <h3>Video</h3>
            <section className="video">AQUI FICARÁ O VIDEO</section>
          </section>
          <section data-testid={ `${0}-recomendation-card` }>
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
  drinksDetails: (id) => dispatch(fetchDrinkDetails(id)),
  foodDetails: (id) => dispatch(fetchFoodDetails(id)),
});

const mapStateToProps = (state) => ({
  details: state.recipeDetails.details,
});

Detalhes.propTypes = {
  isStart: PropTypes.func.isRequired,
  drinksDetails: PropTypes.func.isRequired,
  foodDetails: PropTypes.func.isRequired,
  details: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detalhes);
