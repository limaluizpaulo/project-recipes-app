export async function fetchFoods() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}

export async function fetchDrinks() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpoint).then((data) => data.json());
  return response;
}
