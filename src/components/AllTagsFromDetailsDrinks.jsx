import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function AllTagsFromDetailsDrinks(ingredientsFinal, measuresFinal, drinks) {
  return (
    <section>
      <img
        src={ drinks[0].strDrinkThumb }
        alt={ drinks[0].strDrink }
        width="250px"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{ drinks[0] && drinks[0].strDrink }</p>
      <img src={ shareIcon } alt="Share" data-testid="share-btn" />
      <img src={ whiteHeartIcon } alt="Share" data-testid="favorite-btn" />
      <p data-testid="recipe-category">{ drinks[0].strAlcoholic }</p>
      <h3>Ingredientes</h3>
      <ul>
        { ingredientsFinal
          .map((ing, i) => ((
            <li
              data-testid={ `${i}-ingredient-name-and-measure` }
              key={ i }
            >
              { ing }
              {' '}
              -
              { ' ' }
              { measuresFinal.map((mea, ind) => i === ind && (mea)) }
            </li>
          ))) }
      </ul>
      <h3>Instruções</h3>
      {/* <p data-testid="instructions">{ drinks[0].strInstructions }</p> */}
      <h3>Recomendadas</h3>
      <button type="button" data-testid="start-recipe-btn">Iniciar</button>
    </section>);
}

export default AllTagsFromDetailsDrinks;
