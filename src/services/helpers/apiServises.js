const BASE_URL_MEAL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/';

export async function apiRequestMeal(buttonRadio, searchInput) {
  if (buttonRadio === 'Ingrediente') {
    const fetchIngrediente = await fetch(`${BASE_URL_MEAL}filter.php?i=${searchInput}`);

    try {
      const { meals } = await fetchIngrediente.json();
      return meals;
    } catch (error) {
      return [];
    }
  }

  if (buttonRadio === 'Nome') {
    const fetchName = await fetch(`${BASE_URL_MEAL}search.php?s=${searchInput}`);

    try {
      const { meals } = await fetchName.json();
      return meals;
    } catch (error) {
      return [];
    }
  }

  if (buttonRadio === 'Primeira letra') {
    const fetchLetra = await fetch(`${BASE_URL_MEAL}search.php?f=${searchInput}`);

    try {
      const { meals } = await fetchLetra.json();
      return meals;
    } catch (error) {
      return [];
    }
  }
}

export async function apiRequestDrink(buttonRadio, searchInput) {
  if (buttonRadio === 'Ingrediente') {
    const fetchIngrediente = await fetch(`${BASE_URL_DRINKS}filter.php?i=${searchInput}`);

    try {
      const { drinks } = await fetchIngrediente.json();
      return drinks;
    } catch (error) {
      return [];
    }
  }

  if (buttonRadio === 'Nome') {
    const fetchName = await fetch(`${BASE_URL_DRINKS}search.php?s=${searchInput}`);

    try {
      const { drinks } = await fetchName.json();
      return drinks;
    } catch (error) {
      return [];
    }
  }
  if (buttonRadio === 'Primeira letra') {
    const fetchLetra = await fetch(`${BASE_URL_DRINKS}search.php?f=${searchInput}`);

    try {
      const { drinks } = await fetchLetra.json();
      return drinks;
    } catch (error) {
      return [];
    }
  }
}
