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

export default searchByNameFood;
