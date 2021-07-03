import React, { useContext, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useParams, Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import DrinksContext from '../context/DrinksContext';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodDetails() {
  const { id } = useParams();
  const { allDrinks: { drinks } } = useContext(DrinksContext);
  const { recipeDetail, getRecipesById, ingredientsRecipe } = useContext(RecipesContext);

  function renderHeader() {
    return (
      <header>
        <img
          src={ recipeDetail.strMealThumb }
          alt={ recipeDetail.strMeal }
          data-testid="recipe-photo"
        />
        <section>
          <div className="Title-and-Category">
            <span data-testid="recipe-title">{ recipeDetail.strMeal}</span>
            <span data-testid="recipe-category">{ recipeDetail.strCategory }</span>
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
    getRecipesById(id);
  }, [ingredientsRecipe]);

  return (
    <>
      {renderHeader()}
      <main>
        <section className="Ingredients">
          <h1>Ingredients</h1>
          <div>
            <ul>
              {ingredientsRecipe.map((item, index) => (
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
            <p data-testid="instructions">{recipeDetail.strInstructions}</p>
          </div>
        </section>
        <section>
          <h1>Video</h1>
          <div>
            <ReactPlayer url={ recipeDetail.strYoutube } data-testid="video" />
          </div>
        </section>
        <section>
          <h1>Recomendadas</h1>
          <div>
            {
              drinks.slice(0, NUMBER_OF_ITEMS)
                .map((drink, index) => (
                  <div
                    className="card-field"
                    data-testid={ `${index}-recipe-card` }
                    key={ drink }
                  >
                    <Link to={ `/bebidas/${drink.idDrink}` }>
                      <img
                        data-testid={ `${index}-recomendation-card` }
                        src={ drink.strDrinkThumb }
                        alt={ drink.strDrink }
                      />
                      <span data-testid="recipe-category">{ drink.strAlcoholic }</span>
                      <h5 data-testid={ `${index}-card-name` }>{drink.strDrink}</h5>
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
    </>
  );
}

export default FoodDetails;
