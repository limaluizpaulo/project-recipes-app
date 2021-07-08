export async function searchByIngredientsFood(ingrediente) {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
    .then((response) => response.json()).then((resultObject) => resultObject);
  return result;
}

async function searchByNameFood(name) {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json()).then((resultObject) => resultObject);
  return result;
}

export async function searchByFirstLetterFood(firstLetter) {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    .then((response) => response.json()).then((resultObject) => resultObject);
  return result;
}

export async function searchByIngredientsDrink(ingrediente) {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
    .then((response) => response.json()).then((resultObject) => resultObject);
  return result;
}

export async function searchByNameDrink(name) {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json()).then((resultObject) => resultObject);
  return result;
}

export async function searchByFirstLetterDrink(firstLetter) {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    .then((response) => response.json()).then((resultObject) => resultObject);
  return result;
}

export async function searchByCategoryFood(category) {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json()).then((resultObject) => resultObject);
  return result;
}

export async function searchByCategoryDrink(category) {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json()).then((resultObject) => resultObject);
  return result;
}

export async function searchByAreaFood(area) {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then((response) => response.json()).then((resultObject) => resultObject);
  return result;
}

export async function foodByIngredient(ingredient) {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json()).then((resultObject) => resultObject);
  return result;
}

export async function drinkByIngredient(ingredient) {
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json()).then((resultObject) => resultObject);
  return result;
}

export default searchByNameFood;
