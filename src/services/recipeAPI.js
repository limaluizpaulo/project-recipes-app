const RECIPE_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?';

const fetchRecipe = (type) => {
  console.log(type);
  return fetch(`${RECIPE_API}${type}`)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
};

export default fetchRecipe;
