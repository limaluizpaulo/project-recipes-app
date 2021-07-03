import { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import RecipeContext from '../context/Context';
import getFoodFromUrlParams from '../services/api/getFoodOrDrink';

const useFood = () => {
  const history = useHistory();
  const splittedLocation = history.location.pathname.split('/');

  const { recipeId } = useParams();
  const location = splittedLocation[1];

  const { setSelectedFood } = useContext(RecipeContext);
  useEffect(() => {
    const getFood = async () => {
      const res = await getFoodFromUrlParams(location, recipeId);
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
  }, [location, recipeId, setSelectedFood]);
};

export default useFood;
