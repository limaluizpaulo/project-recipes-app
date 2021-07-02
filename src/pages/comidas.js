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
    const { recipeDetails } = this.props;
    return (
      <section>
        <h3>Detalhes Comidas</h3>
        <RecipeDetails recipeDetails={ recipeDetails } />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  recipeDetails: state.food.foodById,
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
