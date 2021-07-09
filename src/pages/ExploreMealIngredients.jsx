import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import '../styles/exploreMealsIngredients.css';
import loadingSpinner from '../images/loading.gif';
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
          ingredientsList.map(({ idIngredient, strIngredient }, idx) => (
            <div
              className="ingredients__card"
              data-testid={ `${idx}-ingredient-card` }
              id={ strIngredient }
              key={ idIngredient }
              onClick={ handleClick }
              onKeyPress={ handleClick }
              role="button"
              tabIndex={ idx }
            >
              <div className="ingredients__card__img">
                <img
                  data-testid={ `${idx}-card-img` }
                  id={ strIngredient }
                  src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                  alt={ strIngredient }
                />
              </div>
              <div className="ingredients__card_text">
                <p
                  data-testid={ `${idx}-card-name` }
                  id={ strIngredient }
                >
                  { strIngredient }
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

ExploreMealsIngredients.propTypes = {
  history: PropTypes.shape().isRequired,
};
