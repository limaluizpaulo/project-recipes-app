const BASE_URL_MEAL = 'https://www.themealdb.com/api/json/v1/1/';
// const BASE_URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/';

async function apiRequest(buttonRadio, searchInput) {
  // const pathnameMeal = '/comidas';
  // const pathnameDrink = '/bebidas';

  if (buttonRadio === 'Ingrediente') {
    const fetchIngrediente = await fetch(`${BASE_URL_MEAL}filter.php?i=${searchInput}`);
    const response = await fetchIngrediente.json();
    return response;
  }
  if (buttonRadio === 'Nome') {
    const fetchName = await fetch(`${BASE_URL_MEAL}search.php?s=${searchInput}`);
    const response = await fetchName.json();
    return response;
  }
  if (buttonRadio === 'Primeira letra') {
    const fetchLetra = await fetch(`${BASE_URL_MEAL}search.php?f=${searchInput}`);
    const response = await fetchLetra.json();
    return response;
  }
}

export default apiRequest;
