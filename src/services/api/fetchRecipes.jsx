const fetchRecipes = (type = 'meals') => {
  const search = (type === 'meals') ? 'meal' : 'cocktail';
  const URL = `https://www.the${search}db.com/api/json/v1/1/search.php?s=`;
  return fetch(URL)
    .then((res) => res.json())
    .then((res) => res[type]);
};

export default fetchRecipes;
