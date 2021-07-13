import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getFoods } from '../redux/actions';
import API from '../services/MealRecipesAPI';

function IngredientsFoodsTab(props) {
  const { getSelectedIng, ingredients } = props;
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const maxTwelve = 12;
  const itemCatcher = async (value) => {
    await getSelectedIng(value, API.ingredient);
    setShouldRedirect(!shouldRedirect);
  };

  return shouldRedirect ? <Redirect to="/comidas" /> : (
    <div className="items-list">
      {ingredients.map((ingredient, index) => {
        if (index < maxTwelve) {
          return (
            <div className="card">
              <div
                key={ index }
                className="card-body"
                data-testid={ `${index}-ingredient-card` }
                onClickCapture={ () => itemCatcher(ingredient.strIngredient) }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  alt={ ingredient.strIngredient }
                  src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                />
                <div
                  data-testid={ `${index}-card-name` }
                  className="card-subtitle"
                >
                  {ingredient.strIngredient}
                </div>
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
