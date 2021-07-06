const fetchRecipes = async (type = 'meals', ingredient) => {
  const search = (type === 'meals') ? 'meal' : 'cocktail';

  console.log(ingredient);
  const URL = (ingredient)
    ? `https://www.the${search}db.com/api/json/v1/1/filter.php?i=${ingredient}`
    : `https://www.the${search}db.com/api/json/v1/1/search.php?s=`;
  const recipes = await fetch(URL)
    .then((res) => res.json())
    .then((res) => res[type]);

  return recipes;
};

export default fetchRecipes;
