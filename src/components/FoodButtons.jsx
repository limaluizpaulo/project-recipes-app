import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCategorieFoodAction, fetchCategorieFoodFilterAction,
  fetchFoodAction } from '../actions';

class FoodButtons extends Component {
  constructor() {
    super();

    this.state = {
      isToggleOn: false,
    };

    this.requisicao = this.requisicao.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickAll = this.handleClickAll.bind(this);
  }

  componentDidMount() {
    this.requisicao();
  }

  handleClick({ strCategory }) {
    const { requestFoodFilter, requestFood } = this.props;
    const { isToggleOn } = this.state;
    this.setState({
      isToggleOn: !isToggleOn,
    });
    return !isToggleOn ? requestFoodFilter(strCategory) : requestFood();
  }

  handleClickAll() {
    const { requestFood } = this.props;
    const { isToggleOn } = this.state;
    this.setState({
      isToggleOn: !isToggleOn,
    });
    requestFood();
  }

  requisicao() {
    const { requestFoodCategories } = this.props;
    requestFoodCategories();
  }

  render() {
    const { resultFoodCategories } = this.props;
    // const { isToggleOn } = this.state;
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
            // disabled={ isToggleOn }
            onClick={ () => this.handleClick({ strCategory }) }
          >
            {strCategory}
          </button>
        ))}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => this.handleClickAll() }
        >
          All
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultFoodCategories: state.food.categories,
  resultFood: state.food.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  requestFoodCategories: () => (
    dispatch(fetchCategorieFoodAction())),
  requestFoodFilter: (categorie) => (
    dispatch(fetchCategorieFoodFilterAction(categorie))),
  requestFood: () => (
    dispatch(fetchFoodAction())),
});

FoodButtons.propTypes = {
  requestFoodCategories: PropTypes.func.isRequired,
  resultFoodCategories: PropTypes.arrayOf(Object).isRequired,
  requestFoodFilter: PropTypes.func.isRequired,
  requestFood: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodButtons);
