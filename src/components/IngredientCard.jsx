import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function UseGetImages(array) {
  const link = useHistory();
  const db = link.location.pathname.includes('comidas');
  if (db) {
    return array.map(({ strIngredient }) => (
      `www.themealdb.com/images/ingredients/${strIngredient}-Small.png`));
  }
  return array.map(({ strIngredient1 }) => (
    `www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`));
}

function IngredientCard(props) {
  const { ingredients } = props;
  const totalRecipes = 12;
  const food = ingredients.filter((elem, index) => index < totalRecipes);

  const images = UseGetImages(food);

  return food.map((recipe, index) => (
    <Link key={ recipe.idIngredient || recipe.strIngredient1 } to="/comidas">
      <div data-testid={ `${index}-ingredient-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://${images[index]}` }
          alt={ recipe.strIngredient || recipe.strIngredient1 }
          width="60px"
        />
        <h4 data-testid={ `${index}-card-name` }>
          { recipe.strIngredient || recipe.strIngredient1 }
        </h4>
      </div>
    </Link>
  ));
}

const mapStateToProps = (state) => ({
  resultFood: state.food.recipes,
});

export default connect(mapStateToProps)(IngredientCard);
