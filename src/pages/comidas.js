import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';

import { fetchFoodIdAction, fetchDrinkAction } from '../actions';

class comidas extends Component {
  componentDidMount() {
    const { match: { params: { comidaId } },
      requestFoodById, requestDrinkRecipes } = this.props;
    const foodId = comidaId.replace(/[^0-9]/g, '');
    requestFoodById(foodId);
    requestDrinkRecipes();
  }

  render() {
    const { location: { pathname } } = this.props;
    const { recipeDetails, recipes } = this.props;

    return (
      recipeDetails && recipes ? (
        <section>
          <h3>Detalhes Comidas</h3>
          <RecipeDetails
            recipeDetails={ recipeDetails }
            title="Comidas"
            recipes={ recipes }
            link={ pathname }
          />
        </section>
      )
        : null
    );
  }
}

const mapStateToProps = (state) => ({
  recipeDetails: state.food.foodById,
  recipes: state.drink.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  requestFoodById: (id) => dispatch(fetchFoodIdAction(id)),
  requestDrinkRecipes: () => (dispatch(fetchDrinkAction())),
});

comidas.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(comidas);
