import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCategorieFoodAction, fetchCategorieFoodFilterAction } from '../actions';

class FoodButtons extends Component {
  constructor() {
    super();

    this.requisicao = this.requisicao.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.requisicao();
  }

  handleClick({ strCategory }) {
    const { requestFoodFilter } = this.props;
    requestFoodFilter(strCategory);
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
            name="categorie"
            value={ strCategory }
            onClick={ () => this.handleClick({ strCategory }) }
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
  requestFoodFilter: (categorie) => (
    dispatch(fetchCategorieFoodFilterAction(categorie))),
});

FoodButtons.propTypes = {
  requestFoodCategories: PropTypes.func.isRequired,
  resultFoodCategories: PropTypes.arrayOf(Object).isRequired,
  requestFoodFilter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodButtons);
