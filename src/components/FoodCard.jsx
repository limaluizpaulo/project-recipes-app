import React from 'react';
import { connect } from 'react-redux';
//  import PropTypes from 'prop-types';

function FoodCard(props) {
  const { resultFood } = props;

  const totalRecipes = 12;
  const food = resultFood.filter((elem, index) => index < totalRecipes);

  return food.map((recipe, index) => (
    <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        width="60px"
      />
      <h4 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h4>
    </div>
  ));
}

const mapStateToProps = (state) => ({
  resultFood: state.food.recipes,
});

export default connect(mapStateToProps)(FoodCard);
