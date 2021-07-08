import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import DrinksContext from '../context/DrinksContext';
import RecipesContext from '../context/RecipesContext';

import { RecommendedRecipes, Card, BtnPrev, BtnNext } from '../styles/Details';

export default function Recommended() {
  const { allDrinks: { drinks } } = useContext(DrinksContext);
  const { allRecipes: { recipes } } = useContext(RecipesContext);
  const [visible, setVisible] = useState([0, 1]);

  const { pathname } = useLocation();

  const NUMBER_TO_VERIFICATION = -1;
  const NUMBER_OF_ITEMS = 6;

  const getDrinksDetails = pathname.indexOf('bebidas') > NUMBER_TO_VERIFICATION;

  function next() {
    if (visible[1] === NUMBER_OF_ITEMS - 1) {
      setVisible([NUMBER_OF_ITEMS - 1, 0]);
    } else if (visible[1] === 0) {
      setVisible([1, 2]);
    } else {
      setVisible([visible[0] + 1, visible[1] + 1]);
    }
  }

  function prev() {
    if (visible[0] === 0) {
      setVisible([NUMBER_OF_ITEMS - 1, 0]);
    } else if (visible[1] === 0) {
      setVisible([visible[0] - 1, NUMBER_OF_ITEMS - 1]);
    } else {
      setVisible([visible[0] - 1, visible[1] - 1]);
    }
  }
  return getDrinksDetails ? (
    <RecommendedRecipes>
      <h1>Recomendadas</h1>
      <section>
        <BtnPrev
          type="button"
          onClick={ () => prev() }
        >
          &lt;
        </BtnPrev>
        {
          recipes.slice(0, NUMBER_OF_ITEMS)
            .map((recipe, index) => (
              <Card
                showcard={ visible.includes(index) ? 'true' : 'false' }
                data-testid={ `${index}-recipe-card` }
                key={ index }
              >
                <Link
                  to={ `/comidas/${recipe.idMeal}` }
                  style={ { textDecoration: 'none' } }
                >
                  <img
                    data-testid={ `${index}-recomendation-card` }
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                  />
                  <h2
                    data-testid="recipe-category"
                    className="recomendation-category"
                  >
                    { recipe.strCategory }

                  </h2>
                  <h1
                    data-testid={ `${index}-recomendation-title` }
                    className="recomendation-title"
                  >
                    {recipe.strMeal}
                  </h1>
                </Link>
              </Card>
            ))
        }
        <BtnNext
          type="button"
          onClick={ () => next() }
        >
          &gt;
        </BtnNext>
      </section>
    </RecommendedRecipes>
  ) : (
    <RecommendedRecipes>
      <h1>Recomendadas</h1>
      <section>
        <BtnPrev
          type="button"
          onClick={ () => prev() }
        >
          &lt;
        </BtnPrev>
        {
          drinks.slice(0, NUMBER_OF_ITEMS)
            .map((drink, index) => (
              <Card
                showcard={ visible.includes(index) ? 'true' : 'false' }
                data-testid={ `${index}-recipe-card` }
                key={ index }
              >
                <Link
                  to={ `/bebidas/${drink.idDrink}` }
                  style={ { textDecoration: 'none' } }
                >
                  <img
                    data-testid={ `${index}-recomendation-card` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                  <h2
                    data-testid="recipe-category"
                    className="recomendation-category"
                  >
                    { drink.strCategory }

                  </h2>
                  <h1
                    data-testid={ `${index}-recomendation-title` }
                    className="recomendation-title"
                  >
                    {drink.strDrink}
                  </h1>
                </Link>
              </Card>
            ))
        }
        <BtnNext
          type="button"
          onClick={ () => next() }
        >
          &gt;
        </BtnNext>
      </section>
    </RecommendedRecipes>

  );
}
