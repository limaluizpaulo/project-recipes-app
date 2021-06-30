export async function searchByIngredients(ingrediente) {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
    .then((response) => response.json()).then((resultObject) => resultObject);
  return result;
}

async function searchByName(name) {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json()).then((resultObject) => resultObject);
  return result;
}

export async function searchByFirstLetter(firstLetter) {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    .then((response) => response.json()).then((resultObject) => resultObject);
  return result;
}

export default searchByName;
