import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DrinksContext from '../context/DrinksContext';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DrinkDetail() {
  const { id } = useParams();
  const { drinkDetail, getDrinkById, ingredients } = useContext(DrinksContext);

  /*   function getIngredients() {
    const array = [];

    console.log(ingredients);
  } */

  function renderHeader() {
    return (
      <header>
        <img
          src={ drinkDetail.strDrinkThumb }
          alt={ drinkDetail.strDrink }
          data-testid="recipe-photo"
        />
        <section>
          <div className="Title-and-Category">
            <span data-testid="recipe-title">{ drinkDetail.strDrink}</span>
            <span data-testid="recipe-category">{ drinkDetail.strAlcoholic }</span>
          </div>
          <div className="Like-and-Share">
            <button type="button" data-testid="share-btn">
              <img src={ shareIcon } alt="Icon Share" />
            </button>
            <button type="button" data-testid="favorite-btn">
              <img src={ whiteHeartIcon } alt="Icon Like" />
            </button>
          </div>
        </section>
      </header>
    );
  }
  useEffect(() => {
    getDrinkById(id);
  }, [ingredients]);

  return (
    <>
      {renderHeader()}
      <main>
        <section className="Ingredients">
          <h1>Ingredients</h1>
          <div>
            <ul>
              {ingredients.map((item, index) => (
                <li
                  key={ item }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="Instructions">
          <h1>Instructions</h1>
          <div>
            <p data-testid="instructions">{drinkDetail.strInstructions}</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default DrinkDetail;
