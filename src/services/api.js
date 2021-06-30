export const fetchMeals = async (meal) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
  const { results } = await request.json();
  return results;
};

export const fetchDrinks = async (drink) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`);
  const { results } = await request.json();
  return results;
};
