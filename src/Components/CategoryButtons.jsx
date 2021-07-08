/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategory, actionSortCategoriesFood,
  actionSortCategoriesDrink } from '../redux/actions';

import '../styles/Buttons.css';

function CategoryButtons(props) {
  const { categories, listCategory, type,
    setMainFoods, setMainDrinks, foodCategories,
    drinkCategories, cleanFoodsList, cleanDrinksList } = props;

  const copyCategories = [...categories];
  const five = 5;
  const editedCategories = copyCategories.splice(0, five);
  const [filter, setFilter] = React.useState('All');

  const toggleCategory = (category) => {
    if (category !== filter) {
      setFilter(category);
      listCategory(category, type);
    } else {
      setFilter('All');
      listCategory('All', type);
    }
  };

  React.useEffect(() => () => {
    cleanDrinksList();
    cleanFoodsList();
  }, []);

  React.useEffect(() => {
    if (foodCategories.length) { setMainFoods(foodCategories); }
    if (drinkCategories.length) { setMainDrinks(drinkCategories); }
  }, [foodCategories, drinkCategories]);

  return (
    <div className="btn-group categories" role="group">
      <button
        type="button"
        itemType={ type }
        data-testid="All-category-filter"
        className="btn btn-secondary"
        onClick={ () => toggleCategory('All') }
      >
        All

      </button>
      {editedCategories.map((category, index) => (
        <button
          key={ index }
          data-testid={ `${category}-category-filter` }
          itemType={ type }
          type="button"
          className="btn btn-secondary"
          onClick={ () => toggleCategory(category) }
        >
          {category}
        </button>
      ))}

    </div>
  );
}

const mapStateToProps = (state) => ({
  foodCategories: state.foods.categories,
  drinkCategories: state.drinks.categories,
});

const mapDispatchToProps = (dispatch) => ({
  listCategory: (category, type) => dispatch(getCategory(category, type)),
  cleanFoodsList: () => dispatch(actionSortCategoriesFood([])),
  cleanDrinksList: () => dispatch(actionSortCategoriesDrink([])),
});

CategoryButtons.propTypes = PropTypes.shape({}).isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(CategoryButtons);
