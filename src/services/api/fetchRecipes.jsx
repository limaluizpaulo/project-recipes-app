const fetchRecipes = async (type = 'meals', ingredient) => {
  const search = (type === 'meals') ? 'meal' : 'cocktail';

  const URL = (ingredient)
    ? `https://www.the${search}db.com/api/json/v1/1/filter.php?i=${ingredient}`
    : `https://www.the${search}db.com/api/json/v1/1/search.php?s=`;
  const recipes = await fetch(URL)
    .then((res) => res.json())
    .then((res) => res[type]);
  const resLength = 12;

  return recipes.filter((_, index) => index < resLength);
};

export default fetchRecipes;
