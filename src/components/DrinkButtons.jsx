import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCategorieDrinkAction } from '../actions';

class DrinkButtons extends Component {
  constructor() {
    super();

    this.requisicao = this.requisicao.bind(this);
  }

  componentDidMount() {
    this.requisicao();
  }

  requisicao() {
    const { requestDrinkCategories } = this.props;
    requestDrinkCategories();
  }

  render() {
    const { resultDrinkCategories } = this.props;
    const totalCategories = 5;
    const categories = resultDrinkCategories.filter(
      (elem, index) => index < totalCategories,
    );
    return (
      <div>
        {categories.map(({ strCategory }, index) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            key={ index }
          >
            {strCategory}
          </button>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultDrinkCategories: state.drink.categories,
});

const mapDispatchToProps = (dispatch) => ({
  requestDrinkCategories: () => (
    dispatch(fetchCategorieDrinkAction())),
});

DrinkButtons.propTypes = {
  requestDrinkCategories: PropTypes.func.isRequired,
  resultDrinkCategories: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrinkButtons);
