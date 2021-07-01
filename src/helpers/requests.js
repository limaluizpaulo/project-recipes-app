export async function requestMeal() {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const resolve = await request.json();
  return resolve;
}

export async function requestDrink() {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const resolve = await request.json();
  return resolve;
}

export async function requestMealById(id) {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const resolve = await request.json();
  return resolve;
}

export async function requestDrinkById(id) {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const resolve = await request.json();
  return resolve;
}
