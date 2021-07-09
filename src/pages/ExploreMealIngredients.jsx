import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

// Tela de explorar comidas: /explorar/comidas
export default function ExploreMealsIngredients({ history }) {
  const {
    ingredientsList,
    setIngredientsList,
    setPreviousIsExploreIngredients,
    setFilterDrinksIngredients,
  } = useContext(Context);

  useEffect(() => {
    const fetchMealsByIngredients = async () => {
      const DOZE = 12;
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const request = await fetch(endpoint);
      const { meals } = await request.json();
      const ingredients = meals.filter((_ingredient, idx) => idx < DOZE);
      setIngredientsList(ingredients);
    };
    fetchMealsByIngredients();
  }, [setIngredientsList]);

  const fetchRecipesByIngredient = async (ingredient) => {
    const DOZE = 12;
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const request = await fetch(endpoint);
    const { meals } = await request.json();
    const recipes = meals.filter((_ingredient, idx) => idx < DOZE);
    setFilterDrinksIngredients(recipes);
    console.log(recipes);
  };

  const handleClick = ({ target: { id } }) => {
    setPreviousIsExploreIngredients(true);
    fetchRecipesByIngredient(id);
    history.push('/comidas');
  };

  return (
    <div>
      <Header history={ history } title="Explorar Ingredientes" />
      <div className="foodPage">
        {
          ingredientsList.map(({ idIngredient, strIngredient }, idx) => (
            <div
              data-testid={ `${idx}-ingredient-card` }
              id={ strIngredient }
              key={ idIngredient }
              onClick={ handleClick }
              onKeyPress={ handleClick }
              role="button"
              tabIndex={ idx }
            >
              <img
                data-testid={ `${idx}-card-img` }
                id={ strIngredient }
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                alt={ strIngredient }
              />
              <h4
                data-testid={ `${idx}-card-name` }
                id={ strIngredient }
              >
                { strIngredient }
              </h4>
            </div>
          ))
        }
      </div>

      <Footer />
    </div>
  );
}

ExploreMealsIngredients.propTypes = {
  history: PropTypes.shape().isRequired,
};
