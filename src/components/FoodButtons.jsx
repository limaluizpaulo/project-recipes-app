import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategorieFoodFilterAction,
  fetchFoodAction } from '../actions';

import '../css/Buttons.css';

class FoodButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      categories: [],
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
    const { categories, isToggleOn, category } = this.state;
    const { requestFoodFilter, requestFood } = this.props;
    if (!isToggleOn || strCategory !== category) {
      requestFoodFilter(strCategory);
      const toggle = categories.map((categorys) => {
        if (categorys.strCategory === strCategory) return { ...categorys, active: false };
        return { ...categorys, active: true };
      });
      this.setState({ categories: toggle, isToggleOn: true, category: strCategory });
    } else {
      requestFood();
      this.setState({ isToggleOn: false });
    }
  }

  handleClickAll() {
    const { requestFood } = this.props;
    const { categories } = this.state;
    requestFood();
    const toggle = categories.map((category) => ({ ...category, active: false }));
    this.setState({ categories: toggle, isToggleOn: false });
  }

  async requisicao() {
    const magic = 5;
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const { meals } = await result.json();
    const categories = meals
      .filter(({ strCategory }, idx) => idx < magic && ({ active: false, strCategory }));
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    return (
      <div className="buttons-container">
        {categories.map(({ strCategory }, index) => (
          <button
            className="buttons-category"
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
        <button
          className="buttons-category"
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
  categories: state.food.categories,
  resultFood: state.food.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  requestFoodFilter: (categorie) => (
    dispatch(fetchCategorieFoodFilterAction(categorie))),
  requestFood: () => (
    dispatch(fetchFoodAction())),
});

FoodButtons.propTypes = {
  requestFoodFilter: PropTypes.func.isRequired,
  requestFood: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodButtons);
