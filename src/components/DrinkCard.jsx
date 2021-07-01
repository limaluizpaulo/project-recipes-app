//  import React from 'react';
import { connect } from 'react-redux';
//  import PropTypes from 'prop-types';

function DrinkCard() {
  return (
    null
  );
}

const mapStateToProps = (state) => ({
  resultFood: state.food.recipes,
  resultDrink: state.drink.recipes,
});

export default connect(mapStateToProps)(DrinkCard);
