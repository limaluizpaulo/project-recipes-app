const fetchRelated = (url, food) => {
  if (url.match(food)) {
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((response) => response.drinks);
  }
  return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((response) => response.meals);
};

const fetchRecipe = async (url, food, id) => {
  if (url.match(food)) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(console.log('Fetch Recipe'))
      .then((response) => response.json())
      .then((response) => response.meals[0]);
  }
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(console.log('Fetch Recipe'))
    .then((response) => response.json())
    .then((response) => response.drinks[0]);
};

const fetchMeal = async (id) => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((response) => response.json())
  .then((response) => response.meals[0]);

const fetchDrink = async (id) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((response) => response.json())
  .then((response) => response.drinks[0]);

export {
  fetchRelated,
  fetchRecipe,
  fetchMeal,
  fetchDrink,
};
