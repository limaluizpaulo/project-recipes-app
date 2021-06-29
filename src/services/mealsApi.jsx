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
