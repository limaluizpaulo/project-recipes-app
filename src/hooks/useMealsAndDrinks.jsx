import { fetchMealsByIngre, fetchMealsByName } from '../services/mealsApi';
import { fetchDrinkByIngre, fetchDrinkByName } from '../services/drinksApi';

export default function useMealsAndDrinks() {
  const TWELVE = 12;
  const meals = (filterMeals, setMeals, setTitle) => {
    setTitle('Comidas');
    if (filterMeals) {
      fetchMealsByIngre(filterMeals).then((data) => setMeals(data.slice(0, TWELVE)));
    } else {
      fetchMealsByName().then((data) => setMeals(data.slice(0, TWELVE)));
    }
  };

  const drinks = (filterDrinks, setDrinks, setTitle) => {
    setTitle('Bebidas');
    if (filterDrinks) {
      fetchDrinkByIngre(filterDrinks).then((data) => setDrinks(data.slice(0, TWELVE)));
    } else {
      fetchDrinkByName().then((data) => setDrinks(data.slice(0, TWELVE)));
    }
  };

  return { meals, drinks };
}
