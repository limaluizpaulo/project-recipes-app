import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getDrinks } from '../redux/actions';
import API from '../services/BeverageRecipesAPI';
import '../styles/Explore.css';

function IngredientsDrinksTab(props) {
  const { getSelectedIng, ingredients } = props;
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const maxTwelve = 12;
  const itemCatcher = async (value) => {
    await getSelectedIng(value, API.ingredient);
    setShouldRedirect(!shouldRedirect);
  };

  return shouldRedirect ? <Redirect to="/bebidas" /> : (
    <div className="items-list">
      {ingredients.map((ingredient, index) => {
        if (index < maxTwelve) {
          return (
            <div className="card">
              <div
                key={ index }
                className="card-body"
                data-testid={ `${index}-ingredient-card` }
                onClickCapture={ () => itemCatcher(ingredient.strIngredient1) }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  alt={ ingredient.strIngredient1 }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                />
                <div
                  className="card-subtitle"
                  data-testid={ `${index}-card-name` }
                >
                  {ingredient.strIngredient1}
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
  getSelectedIng: (value, callback) => dispatch(getDrinks(value, callback)),
});

IngredientsDrinksTab.propTypes = {
  getSelectedIng: PropTypes.any,
}.isRequired;

export default connect(null, mapDispatchToProps)(IngredientsDrinksTab);
