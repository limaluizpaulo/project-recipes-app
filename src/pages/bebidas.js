import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RecipeDetails from '../components/RecipeDetails';

import { fetchDrinkIdAction } from '../actions';

class bebidas extends Component {
  componentDidMount() {
    const { match: { params: { bebidaId } }, requestDrinkById } = this.props;
    requestDrinkById(bebidaId);
  }

  render() {
    const { recipeDetails } = this.props;
    return (
      recipeDetails ? (
        <section>
          <h3>Detalhes Bebida</h3>
          <RecipeDetails recipeDetails={ recipeDetails } title="Bebidas" />
        </section>
      )
        : null
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestDrinkById: (id) => dispatch(fetchDrinkIdAction(id)),
});

const mapStateToProps = (state) => ({
  recipeDetails: state.drink.drinkById,
});

bebidas.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(bebidas);
