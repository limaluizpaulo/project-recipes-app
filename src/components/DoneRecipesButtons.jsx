import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import '../css/Buttons.css';

class DoneRecipesButtons extends Component {
  render() {
    const { statusButton } = this.props;
    return (
      <div>
        <Button
          type="button"
          className="buttons"
          data-testid="filter-by-all-btn"
          onClick={ (e) => statusButton(e) }
        >
          All
        </Button>
        <Button
          className="buttons"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ (e) => statusButton(e) }
        >
          Food
        </Button>
        <Button
          className="buttons"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ (e) => statusButton(e) }
        >
          Drink
        </Button>
      </div>
    );
  }
}

DoneRecipesButtons.propTypes = {
  statusButton: PropTypes.string,
}.isRequired;

export default DoneRecipesButtons;
