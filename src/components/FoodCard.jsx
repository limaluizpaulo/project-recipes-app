import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/Card.css';

function FoodCard(props) {
  const { resultFood } = props;
  const totalRecipes = 12;
  const food = resultFood.filter((elem, index) => index < totalRecipes);

  return food.map((recipe, index) => (
    <div key={ recipe.idMeal } className="card">
      <Link to={ `/comidas/${recipe.idMeal}` }>
        <div data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            width="60px"
          />
          <h4 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h4>
        </div>
      </Link>
    </div>

  ));
}

const mapStateToProps = (state) => ({
  resultFood: state.food.recipes,
});

export default connect(mapStateToProps)(FoodCard);
