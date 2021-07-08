import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getFoods } from '../redux/actions';
import API from '../services/MealRecipesAPI';
import '../styles/Explore.css';

function IngredientsFoodsTab(props) {
  const { getSelectedIng, ingredients } = props;
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const maxTwelve = 12;
  const itemCatcher = (value) => {
    getSelectedIng(value, API.ingredient);
    setShouldRedirect(!shouldRedirect);
  };

  return shouldRedirect ? <Redirect to="/comidas" /> : (
    <div className="ingredientTab">
      {ingredients.map((ingredient, index) => {
        if (index < maxTwelve) {
          return (
            <div
              key={ ingredient.strIngredient }
              className="ingredientScreen"
              data-testid={ `${index}-ingredient-card` }
              onClickCapture={ () => itemCatcher(ingredient.strIngredient) }
            >
              <img
                data-testid={ `${index}-card-img` }
                className="ingredientImage"
                width="100px"
                alt={ ingredient.strIngredient }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              />
              <div
                data-testid={ `${index}-card-name` }
                className="ingredientName"
              >
                {ingredient.strIngredient}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>

  );
}

const mapDispatchToProps = (dispatch) => ({
  getSelectedIng: (value, callback) => dispatch(getFoods(value, callback)),
});

IngredientsFoodsTab.propTypes = {
  getSelectedIng: PropTypes.any,
}.isRequired;

export default connect(null, mapDispatchToProps)(IngredientsFoodsTab);
