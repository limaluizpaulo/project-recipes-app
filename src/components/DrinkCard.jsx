import React from 'react';
import { connect } from 'react-redux';
//  import PropTypes from 'prop-types';

function DrinkCard(props) {
  const { resultDrink } = props;

  const totalRecipes = 12;
  return resultDrink.map((recipe, index) => {
    if (index < totalRecipes) {
      return (
        <div key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            width="60px"
          />
          <h4 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h4>
        </div>
      );
    }
    return null;
  });
}

const mapStateToProps = (state) => ({
  resultFood: state.food.recipes,
  resultDrink: state.drink.recipes,
});

export default connect(mapStateToProps)(DrinkCard);
