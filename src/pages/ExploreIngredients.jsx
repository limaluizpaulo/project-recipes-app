import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getIngredientsMealsList, getIngredientsDrinksList } from '../services';
import { Footer, Header } from '../components';

function ExploreIngredients({ history }) {
  const { pathname } = history.location;
  const TWICE = 12;
  const [ingredientsMeals, setIngredientsMeals] = useState([]);
  const [ingredientsDrinks, setIngredientsDrinks] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      const respMeals = await getIngredientsMealsList();
      const respDrinks = await getIngredientsDrinksList();
      setIngredientsMeals(respMeals.slice(0, TWICE));
      setIngredientsDrinks(respDrinks.slice(0, TWICE));
    };
    getIngredients();
  }, []);

  const ingredientImgMeal = (name) => (
    `https://www.themealdb.com/images/ingredients/${name}-Small.png`);
  const ingredientImgDrink = (name) => (
    `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`);

  const renderMealsIngredients = () => (
    ingredientsMeals.map((item, index) => (
      <section key={ index } data-testid={ `${index}-ingredient-card` }>
        <Link to="/comidas">
          <p data-testid={ `${index}-card-name` }>
            {item.strIngredient}
          </p>

          <img
            data-testid={ `${index}-card-img` }
            src={ ingredientImgMeal(item.strIngredient) }
            alt={ item.strIngredient }
          />
        </Link>
      </section>))
  );

  const renderDrinksIngredients = () => (
    ingredientsDrinks.map((item, index) => (
      <section key={ index } data-testid={ `${index}-ingredient-card` }>
        <p data-testid={ `${index}-card-name` }>
          {item.strIngredient1}
        </p>

        <img
          data-testid={ `${index}-card-img` }
          src={ ingredientImgDrink(item.strIngredient1) }
          alt={ item.strIngredient1 }
        />
      </section>))
  );

  return (
    <section>
      <Header />
      {pathname.includes('comidas')
        ? renderMealsIngredients() : renderDrinksIngredients()}
      <Footer />
    </section>
  );
}

ExploreIngredients.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default ExploreIngredients;
