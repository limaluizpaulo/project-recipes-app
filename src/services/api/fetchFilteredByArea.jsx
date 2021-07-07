import fetchRecipes from './fetchRecipes';

const fetchFilteredByArea = async (area) => {
  if (area === 'All') {
    const res = await fetchRecipes();
    return res;
  }
  const resLength = 12;
  const MEALS_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const recipes = await fetch(MEALS_URL)
    .then((res) => res.json())
    .then((res) => res.meals);
  const filtered = recipes.filter((_, index) => index < resLength);
  return filtered;
  // const ids = filtered.map(({ idMeal }) => idMeal);
  // const recipesResponse = await Promise.all(ids
  //   .map((id) => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  //     .then((res) => res.json())
  //     .then((res) => res.meals[0])));
  // return recipesResponse;
};

export default fetchFilteredByArea;
