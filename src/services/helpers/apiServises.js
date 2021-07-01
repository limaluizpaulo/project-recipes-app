const BASE_URL_MEAL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/';

export async function apiRequestMeal(buttonRadio, searchInput) {
  if (buttonRadio === 'Ingrediente') {
    const fetchIngrediente = await fetch(`${BASE_URL_MEAL}filter.php?i=${searchInput}`);
    const { meals } = await fetchIngrediente.json();
    return meals;
  }
  if (buttonRadio === 'Nome') {
    const fetchName = await fetch(`${BASE_URL_MEAL}search.php?s=${searchInput}`);
    const { meals } = await fetchName.json();
    return meals;
  }
  if (buttonRadio === 'Primeira letra') {
    const fetchLetra = await fetch(`${BASE_URL_MEAL}search.php?f=${searchInput}`);
    const { meals } = await fetchLetra.json();
    return meals;
  }
}

export async function apiRequestDrink(buttonRadio, searchInput) {
  if (buttonRadio === 'Ingrediente') {
    const fetchIngrediente = await fetch(`${BASE_URL_DRINKS}filter.php?i=${searchInput}`);
    const { drinks } = await fetchIngrediente.json();
    return drinks;
  }

  if (buttonRadio === 'Nome') {
    const fetchName = await fetch(`${BASE_URL_DRINKS}search.php?s=${searchInput}`);
    const { drinks } = await fetchName.json();
    return drinks;
  }
  if (buttonRadio === 'Primeira letra') {
    const fetchLetra = await fetch(`${BASE_URL_DRINKS}search.php?f=${searchInput}`);
    const { drinks } = await fetchLetra.json();
    return drinks;
  }
}
