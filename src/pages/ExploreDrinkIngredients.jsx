import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import '../styles/exploreMealsIngredients.css';
import loadingSpinner from '../images/loading.gif';
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

      try {
        const request = await fetch(endpoint);
        const { drinks } = await request.json();
        const ingredients = drinks.filter((_ingredient, idx) => idx < DOZE);
        setIngredientsList(ingredients);
      } catch (erro) {
        console.log(erro);
      }
    };
    fetchMealsByIngredients();
  }, [setIngredientsList]);

  const fetchRecipesByIngredient = async (ingredient) => {
    const DOZE = 12;
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const request = await fetch(endpoint);
    const { drinks } = await request.json();
    const recipes = drinks.filter((_ingredient, idx) => idx < DOZE);
    setFilterDrinksIngredients(recipes);
  };

  const handleClick = ({ target: { id } }) => {
    setPreviousIsExploreIngredients(true);
    fetchRecipesByIngredient(id);
    history.push('/bebidas');
  };

  if (!ingredientsList.length) {
    return (
      <>
        <Header history={ history } title="Explorar Ingredientes" />
        <div className="exploreIngredientsPage__loading">
          <img className="loading" src={ loadingSpinner } alt="loading spinner" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header history={ history } title="Explorar Ingredientes" />
      <div className="exploreIngredientsPage">
        {
          ingredientsList.map(({ strIngredient1 }, idx) => (
            <div
              className="ingredients__card"
              data-testid={ `${idx}-ingredient-card` }
              id={ strIngredient1 }
              key={ idx }
              onClick={ handleClick }
              onKeyPress={ handleClick }
              role="button"
              tabIndex={ idx }
            >
              <div className="ingredients__card__img">
                <img
                  data-testid={ `${idx}-card-img` }
                  id={ strIngredient1 }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  alt={ strIngredient1 }
                />
              </div>
              <div className="ingredients__card_text">
                <p
                  data-testid={ `${idx}-card-name` }
                  id={ strIngredient1 }
                >
                  { strIngredient1 }
                </p>
              </div>
            </div>
          ))
        }
      </div>
      <Footer />
    </>
  );
}

ExploreDrinksIngredients.propTypes = {
  history: PropTypes.shape().isRequired,
};
