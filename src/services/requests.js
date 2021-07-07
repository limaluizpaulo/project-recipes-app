export default async () => {
  const endPoints = [
    'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
  ];
  const resolves = endPoints.map((URL) => fetch(URL).then((res) => res.json()));
  const [meals, drinks, ctgMeals, ctgDrinks, ingMeals, ingDrinks] = await Promise
    .all(resolves);
  return { meals, drinks, ctgMeals, ctgDrinks, ingMeals, ingDrinks };
};

export const recipeById = (id, meal = false) => {
  const db = meal ? 'themealdb' : 'thecocktaildb';
  const URL = `https://www.${db}.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetch(URL)
    .then((res) => res.json())
    .then(({ meals = [], drinks = [] }) => meals[0] || drinks[0]);
};
