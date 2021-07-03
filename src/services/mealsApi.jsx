export const fetchMealsByIngre = async (ingre) => {
  const fetchIngre = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingre}`);
  const response = await fetchIngre.json();
  const data = response.meals;
  return data;
};

export const fetchMealsByName = async (name = '') => {
  const fetchName = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await fetchName.json();
  const data = response.meals;
  return data;
};

export const fetchMealsByFirstLetter = async (letter) => {
  const fetchLetter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const response = await fetchLetter.json();
  const data = response.meals;
  return data;
};

export const fetchCategoryMeals = async () => {
  const fetchCategory = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const response = await fetchCategory.json();
  const data = response.meals;
  return data;
};

export const fetchMealsByCategory = async (category) => {
  const fetchByCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const response = await fetchByCategory.json();
  const data = response.meals;
  return data;
};

export const fetchMealById = async (id) => {
  const fetchMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const response = await fetchMeal.json();
  const data = response.meals;
  return data;
};

export const fetchIngreMeals = async () => {
  const fetchIngre = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const response = await fetchIngre.json();
  const data = response.meals;
  return data;
};

export const fetchAreaMeals = async () => {
  const fetchArea = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const response = await fetchArea.json();
  const data = response.meals;
  return data;
};

export const fetchMealByArea = async (area) => {
  const fetchMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const response = await fetchMeal.json();
  const data = response.meals;
  return data;
};
