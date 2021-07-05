import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

// Tela de explorar comidas: /explorar/comidas
export default function ExploreDrinksIngredients({ history }) {
  const {
    ingredientsList,
    setIngredientsList,
    setPreviousIsExploreIngredients,
    setFilterDrinksIngredients,
  } = useContext(Context);

  useEffect(() => {
    const fetchMealsByIngredients = async () => {
      const DOZE = 12;
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const request = await fetch(endpoint);
      const { drinks } = await request.json();
      const ingredients = drinks.filter((_ingredient, idx) => idx < DOZE);
      setIngredientsList(ingredients);
    };
    fetchMealsByIngredients();
  }, []);

  const fetchRecipesByIngredient = async (ingredient) => {
    const DOZE = 12;
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const request = await fetch(endpoint);
    const { drinks } = await request.json();
    const recipes = drinks.filter((_ingredient, idx) => idx < DOZE);
    setFilterDrinksIngredients(recipes);
    console.log(recipes);
  };

  const handleClick = ({ target: { id } }) => {
    setPreviousIsExploreIngredients(true);
    fetchRecipesByIngredient(id);
    history.push('/bebidas');
  };

  return (
    <div>
      <h4>ExploreDrinksIngredients</h4>
      <Header history={ history } title="Explorar Ingredientes" />
      {
        ingredientsList.map(({ strIngredient1 }, idx) => (
          <div
            data-testid={ `${idx}-ingredient-card` }
            id={ strIngredient1 }
            key={ idx }
            onClick={ handleClick }
            onKeyPress={ handleClick }
            role="button"
            tabIndex={ idx }
          >
            <img
              data-testid={ `${idx}-card-img` }
              id={ strIngredient1 }
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ strIngredient1 }
            />
            <h4
              data-testid={ `${idx}-card-name` }
              id={ strIngredient1 }
            >
              { strIngredient1 }
            </h4>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}

ExploreDrinksIngredients.propTypes = {
  history: PropTypes.shape().isRequired,
};
