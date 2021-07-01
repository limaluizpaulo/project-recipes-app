export const fetchDrinkByIngre = async (ingre) => {
  const fetchIngre = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingre}`);
  const response = await fetchIngre.json();
  const data = response.drinks;
  return data;
};

export const fetchDrinkByName = async (name = '') => {
  const fetchName = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await fetchName.json();
  const data = response.drinks;
  return data;
};

export const fetchDrinkByFirstLetter = async (letter) => {
  const fetchLetter = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const response = await fetchLetter.json();
  const data = response.drinks;
  return data;
};

export const fetchCategoryDrinks = async () => {
  const fetchCategory = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const response = await fetchCategory.json();
  const data = response.drinks;
  return data;
};

export const fetchDrinksByCategory = async (category) => {
  const fetchByCategory = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const response = await fetchByCategory.json();
  const data = response.drinks;
  return data;
};

export const fetchIngreDrinks = async () => {
  const fetchIngre = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const response = await fetchIngre.json();
  const data = response.drinks;
  return data;
};
