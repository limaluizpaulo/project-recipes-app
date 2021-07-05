import React from 'react';
import { connect } from 'react-redux';

import '../css/RecomendedCard.css';

function RecomendedCard(props) {
  const { recipes } = props;

  const totalCards = 6;
  const cards = recipes.filter((elem, index) => index < totalCards);
  console.log(cards);

  return cards.map((recipe, index) => (
    <div
      key={ index }
      data-testid={ `${index}-recomendation-card` }
      className="recomendation-card"
    >
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        width="100px"
      />
      <div data-testid={ `${index}-recomendation-title` }>
        {recipe.strMeal || recipe.strDrink}
      </div>
    </div>
  ));
}

const mapStateToProps = (state) => ({
  resultDrink: state.drink.recipes,
});

export default connect(mapStateToProps)(RecomendedCard);