async function requestMeal(name = '') {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const grup = url + name;
  const request = await fetch(grup);
  const resolve = await request.json();
  return resolve;
}

export async function requestDrink(name = '') {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const grup = url + name;
  const request = await fetch(grup);
  const resolve = await request.json();
  return resolve;
}

export async function requestMealById(id) {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const resolve = await request.json();
  return resolve;
}

export async function requestCategoryMeal() {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const resolve = await request.json();
  return resolve;
}

export async function requestDrinkById(id) {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const resolve = await request.json();
  return resolve;
}

export async function requestAreaMeal(paramer) {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=${paramer}`);
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

export async function requestFilterAreaMeal(name) {
  const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
  const grup = url + name;
  const request = await fetch(grup);
  const resolve = await request.json();
  return resolve;
}

export async function requesIngredientsmeal(name) {
  const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  const grup = url + name;
  const request = await fetch(grup);
  const resolve = await request.json();
  return resolve;
}

export async function requesfirsLettertsmeal(name) {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
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

export async function requesIngredientDrink(name) {
  // presisamos melhorar o tratamento de erro
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
  const grup = url + name;

  try {
    const request = await fetch(grup);
    const resolve = await request.json();
    return resolve;
  } catch (erro) {
    global.alert('Bebida não encontrada!');
  }
}

export async function requesfirsLettertDrink(name = '') {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
  const grup = url + name;
  const request = await fetch(grup);
  const resolve = await request.json();
  return resolve;
}

export async function requestAllCategory() {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(url);
  const resolve = await request.json();
  return resolve;
}

export async function requestAllDrinkCategory() {
  // const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007';
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(url);
  const resolve = await request.json();
  return resolve;
}

export async function requestAllMealIngredients() {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const request = await fetch(url);
  const resolve = await request.json();
  return resolve;
}

export async function requestAllDrinkIngredients() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const request = await fetch(url);
  const resolve = await request.json();
  return resolve;
}

export default requestMeal;
