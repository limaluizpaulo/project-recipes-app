import React from 'react';
import { connect } from 'react-redux';

//  import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkCard(props) {
  const { resultDrink } = props;

  const totalRecipes = 12;
  const drinks = resultDrink.filter((elem, index) => index < totalRecipes);

  return drinks.map((recipe, index) => (
    <Link key={ recipe.idDrink } to={ `/bebidas/${recipe.idDrink}` }>
      <div key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.strDrinkThumb }
          alt={ recipe.strDrink }
          width="60px"
        />
        <h4 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h4>
      </div>
    </Link>
  ));
}

const mapStateToProps = (state) => ({
  resultDrink: state.drink.recipes,
});

export default connect(mapStateToProps)(DrinkCard);
