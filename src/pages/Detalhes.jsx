import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { fetchDrinkDetails, fetchFoodDetails, startRecipe } from '../action';

import Ingredients from '../components/Ingredients';
import '../css/Details.css';
// import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import Instructions from '../components/Instructions';
import DetailsHeader from '../components/DetailsHeader';
import SharedFavorites from '../components/SharedFavorites';

class Detalhes extends Component {s

  componentDidMount() {
    const { match: { params: { page, id } }, foodDetails, drinksDetails } = this.props;
    if (page === 'comidas') {
      return foodDetails(id);
    }
    return drinksDetails(id);
  }

  render() {
    const { isStart, details } = this.props;
    return (
      <section>
        <DetailsHeader data={ details } />
        <SharedFavorites />
        <section className="details-content">
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
  mealsDetails: state.foodCategories.recipeDetails,
  details: state.recipeDetails.details,
});

// Detalhes.propTypes = {
//   idMeal: PropTypes.string.isRequired,
//   strMealThumb: PropTypes.string.isRequired,
//   strMeal: PropTypes.string.isRequired,
//   strCategory: PropTypes.string.isRequired,
//   mealsDetails: PropTypes.shape.isRequired,
//   strInstructions: PropTypes.string.isRequired,
// };
// });

Detalhes.propTypes = {
  isStart: PropTypes.func.isRequired,
  drinksDetails: PropTypes.func.isRequired,
  foodDetails: PropTypes.func.isRequired,
  details: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detalhes);
