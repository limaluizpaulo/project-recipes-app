import React from 'react';
import { connect } from 'react-redux';
//  import PropTypes from 'prop-types';
import { fetchFoodIdAction } from '../actions';

function FoodCard(props) {
  const { resultFood, requestFoodById } = props;

  const totalRecipes = 12;
  const food = resultFood.filter((elem, index) => index < totalRecipes);

  return food.map((recipe, index) => (
    <button
      type="button"
      key={ recipe.idMeal }
      onClick={ () => requestFoodById(recipe.idMeal) }
    >
      <div data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.strMealThumb }
          alt={ recipe.strMeal }
          width="60px"
        />
        <h4 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h4>
      </div>

    </button>
  ));
}

const mapStateToProps = (state) => ({
  resultFood: state.food.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  requestFoodById: (id) => dispatch(fetchFoodIdAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodCard);
