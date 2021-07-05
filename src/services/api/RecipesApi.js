const RecipesApi = async (type, idRecipe) => {
  const search = (type === 'meals') ? 'meal' : 'cocktail';
  const endpoint = `(https://www.the${search}db.com/api/json/v1/1/lookup.php?i=${idRecipe})`;
  const response = await fetch(endpoint);
  const result = await response.json();
  return result[type];
};

export default RecipesApi;
