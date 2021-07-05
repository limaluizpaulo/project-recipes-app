import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import store, { addRecDetail, setLoading } from '../../context/store';
import { fetchAPI, FETCH_ID_D, FETCH_ID_M } from '../../services';

export default function RecipeCard() {
  const { recipes: { foods, meals, drinks, cardsLimit }, setRecipes } = useContext(store);

  const getRecipeDetailByID = async (id) => {
    if (foods === null) {
      setRecipes(setLoading(true));
    } else if (foods) {
      setRecipes(setLoading(true));
      const mealsDetails = await fetchAPI(`${FETCH_ID_M}${id}`);
      setRecipes(addRecDetail(mealsDetails.meals[0]));
      setRecipes(setLoading(false));
    } else {
      setRecipes(setLoading(true));
      const drinksDetails = await fetchAPI(`${FETCH_ID_D}${id}`);
      setRecipes(addRecDetail(drinksDetails.drinks[0]));
      setRecipes(setLoading(false));
    }
  };

  const renderRecipes = () => {
    const newRecipes = (foods) ? meals.slice(0, cardsLimit) : drinks.slice(0, cardsLimit);

    return (
      newRecipes.map((recipe, index) => {
        const id = (foods) ? recipe.idMeal : recipe.idDrink;
        return (
          <Link
            to={ (foods) ? (`/comidas/${id}`) : (`/bebidas/${id}`) }
            key={ index }
          >
            <button
              type="button"
              data-testid={ `${index}-recipe-card` }
              className="recipe"
              onClick={ () => getRecipeDetailByID(id) }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strMealThumb || recipe.strDrinkThumb }
                alt="recipe-img"
                className="recipeImg"
              />
              <h4
                data-testid={ `${index}-card-name` }
                className="recipeTitle"
              >
                {
                  recipe.strMeal || recipe.strDrink
                }
              </h4>
            </button>
          </Link>
        );
      })
    );
  };

  return (
    <div className="recipes">
      {renderRecipes()}
    </div>
  );
}
