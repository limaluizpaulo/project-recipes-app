import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//  import PropTypes from 'prop-types';

// const fetchFoodIngredientsImg = async (ingredient) => {
//   const result = await fetch(`www.themealdb.com/images/ingredients/${ingredient}-Small.png`);
//   console.log(result.url);
//   return result;
// };

function IngredientCard(props) {
  const { ingredients } = props;
  const totalRecipes = 12;
  const food = ingredients.filter((elem, index) => index < totalRecipes);

  const images = food.map(({ strIngredient }) => (
    `www.themealdb.com/images/ingredients/${strIngredient}-Small.png`));

  return food.map((recipe, index) => (
    <Link key={ recipe.idIngredient } to="">
      <div data-testid={ `${index}-ingredient-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://${images[index]}` }
          alt={ recipe.strIngredient }
          width="60px"
        />
        <h4 data-testid={ `${index}-card-name` }>{ recipe.strIngredient }</h4>
      </div>
    </Link>
  ));
}

const mapStateToProps = (state) => ({
  resultFood: state.food.recipes,
});

export default connect(mapStateToProps)(IngredientCard);
