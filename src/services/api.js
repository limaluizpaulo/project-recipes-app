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
