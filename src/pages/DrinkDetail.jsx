import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DrinksContext from '../context/DrinksContext';
import RecipesContext from '../context/RecipesContext';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DrinkDetail() {
  const { id } = useParams();
  const { allRecipes: { recipes } } = useContext(RecipesContext);
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

  const NUMBER_OF_ITEMS = 6;
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
        <section>
          <h1>Recomendadas</h1>
          <div>
            {
              recipes.slice(0, NUMBER_OF_ITEMS)
                .map((recipe, index) => (
                  <div
                    className="card-field"
                    data-testid={ `${index}-recipe-card` }
                    key={ recipe }
                  >
                    <Link to={ `/comidas/${recipe.idMeal}` }>
                      <img
                        data-testid={ `${index}-recomendation-card` }
                        src={ recipe.strMealThumb }
                        alt={ recipe.strMeal }
                      />
                      <span data-testid="recipe-category">{ recipe.strCategory }</span>
                      <h5 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h5>
                    </Link>
                  </div>
                ))
            }
          </div>
          <button type="button" data-testid="start-recipe-btn">
            <span>Iniciar Receita</span>
          </button>
        </section>
      </main>

      <p>Bebidas</p>
    </>
  );
}

export default DrinkDetail;
