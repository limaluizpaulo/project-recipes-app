export async function requestByDetailsMeal(id) {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((resolve) => resolve.json()).then((response) => response);
  return result;
}

export async function requestByDetailsDrink(id) {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((resolve) => resolve.json()).then((response) => response);
  return result;
}

export async function requestMeal() {
  const fetchMeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await fetchMeal.json();
  return meals;
}

export async function requestDrink() {
  const fetcDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await fetcDrink.json();
  return drinks;
}

export async function requestRandomMeal() {
  const fetchMeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const { meals } = await fetchMeal.json();
  return meals;
}

export async function requestRandomDrink() {
  const fetchDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const { drinks } = await fetchDrink.json();
  return drinks;
}
