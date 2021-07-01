async function requestMeal() {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const resolve = await request.json();
  return resolve;
}

export async function requestDrink() {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const resolve = await request.json();
  return resolve;
}

export async function requestCategoryMeal() {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const resolve = await request.json();
  return resolve;
}

export async function requestCategoryDrink() {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const resolve = await request.json();
  return resolve;
}

export async function requestNamemeal(name) {
  const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const grup = url + name;
  const request = await fetch(grup);
  const resolve = await request.json();
  return resolve;
}

export async function requestNameDrink(name) {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  const grup = url + name;
  const request = await fetch(grup);
  const resolve = await request.json();
  return resolve;
}

export default requestMeal;
