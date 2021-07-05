export const fetchAPI = async (API, chosenFilter, searchText) => {
  try {
    const result = await fetch(API + chosenFilter + searchText).then((res) => res.json());
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  const mealsPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinksPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const mealsPromisse = await fetch(mealsPoint);
  const drinksPromisse = await fetch(drinksPoint);
  const result = {
    drinks: await drinksPromisse.json(),
    meals: await mealsPromisse.json(),
  };
  result.meals = result.meals.meals;
  result.drinks = result.drinks.drinks;
  return result;
};

export const getMealsRecipes = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const promisse = await fetch(endPoint);
  const result = await promisse.json();
  return result.meals;
};

export const getDrinksRecipes = async () => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const promisse = await fetch(endPoint);
  const result = await promisse.json();
  return result.drinks;
};
