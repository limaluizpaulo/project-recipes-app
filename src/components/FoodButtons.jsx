import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCategorieFoodAction } from '../actions';

class FoodButtons extends Component {
  constructor() {
    super();

    this.requisicao = this.requisicao.bind(this);
  }

  componentDidMount() {
    this.requisicao();
  }

  requisicao() {
    const { requestFoodCategories } = this.props;
    requestFoodCategories();
  }

  render() {
    const { resultFoodCategories } = this.props;
    const totalCategories = 5;
    const categories = resultFoodCategories.filter(
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
  resultFoodCategories: state.food.categories,
});

const mapDispatchToProps = (dispatch) => ({
  requestFoodCategories: () => (
    dispatch(fetchCategorieFoodAction())),
});

FoodButtons.propTypes = {
  requestFoodCategories: PropTypes.func.isRequired,
  resultFoodCategories: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodButtons);
