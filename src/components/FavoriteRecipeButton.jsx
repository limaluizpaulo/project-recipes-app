import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/Buttons.css';

class FavoriteRecipesButtons extends Component {
  render() {
    const { statusButton } = this.props;
    return (
      <div className="buttons-container">
        <button
          className="buttons-category"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ (e) => statusButton(e) }
        >
          All
        </button>
        <button
          className="buttons-category"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ (e) => statusButton(e) }
        >
          Food
        </button>
        <button
          className="buttons-category"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ (e) => statusButton(e) }
        >
          Drink
        </button>
      </div>
    );
  }
}

FavoriteRecipesButtons.propTypes = {
  statusButton: PropTypes.string,
}.isRequired;

export default FavoriteRecipesButtons;
