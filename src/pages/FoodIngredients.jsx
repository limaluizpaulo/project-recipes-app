import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodDetails from '../components/FoodDetails';
import IngredientList from '../components/IngredientList';
import FoodVideoAndRecomendation from '../components/FoodVideoAndRecomendation';
import getFoodFromUrlParams from '../services/api/getFoodOrDrink';
import RecipeContext from '../context/Context';

// Tela de explorar comidas por ingrediente: /explorar/comidas/ingredientes
export default function FoodIngredients({ history }) {
  const { setSelectedFood } = useContext(RecipeContext);

  useEffect(() => {
    const getFood = async () => {
      const params = history.location.pathname.split('/');
      params.shift();
      const [location, id] = params;
      const res = await getFoodFromUrlParams(location, id);
      const SIX = 6;
      if (location === 'comidas') {
        const alternativas = await getFoodFromUrlParams('bebidasAlternativas');
        const sixAlternatives = alternativas.drinks.slice(0, SIX);
        const meal = res.meals[0];
        meal.alternatives = sixAlternatives;
        setSelectedFood(meal);
      } else {
        const alternativas = await getFoodFromUrlParams('comidasAlternativas');
        const sixAlternatives = alternativas.meals.slice(0, SIX);
        const drink = res.drinks[0];
        drink.alternatives = sixAlternatives;
        setSelectedFood(drink);
      }
    };
    getFood();
  }, [history.location.pathname, setSelectedFood]);

  return (
    <div>
      <Header history={ history } title="Explorar Ingredientes" />
      <section>
        <FoodDetails>
          <IngredientList />
        </FoodDetails>
        <FoodVideoAndRecomendation />
        <button className="foodDetails__startBtn" type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </section>
      <Footer />
    </div>
  );
}

FoodIngredients.propTypes = {
  history: PropTypes.shape().isRequired,
};
