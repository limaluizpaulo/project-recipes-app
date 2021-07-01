import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';

import { fetchFoodIdAction } from '../actions';

class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = this.props;
    console.log(id);
  }

  render() {
    const { recipeDetails } = this.props;
    console.log(recipeDetails);

    return (
      <section>
        <div>
          <img data-testid="recipe-photo" src="" alt="" />
          <h1 data-testid="recipe-title">Detalhes Bebidas</h1>
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
          <span data-testid="recipe-category" />
        </div>
        <div>
          <h4>Ingredientes</h4>
          <ul />
        </div>
        <div>
          <h4>Instruções</h4>
          <p data-testid="instructions" />
        </div>
        <div>
          <h4>Video</h4>
          {/* <iframe
            data-testid="video" */}
          {/* /> */}
        </div>
        <div>
          <h4>Recomendadas</h4>
          {
            /* <div data-testid={ `${index}-recomendation-card` }>Carrosel de cards</div> */
          }
        </div>
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

const mapDispatchToProps = (dispatch) => ({
  requestFoodById: (id) => dispatch(fetchFoodIdAction(id)),
});

const mapStateToProps = (state) => ({
  recipeDetails: state.food.foodById,
});

RecipeDetails.propTypes = {
  recipeDetails: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
