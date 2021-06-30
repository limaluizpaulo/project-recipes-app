export const MealServiceIngredientsAPI = async (ingredient) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endpoint);
  const responseObject = await response.json();
  return responseObject.meals;
};

export const MealServiceNameAPI = async (name) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(endpoint);
  const responseObject = await response.json();
  return responseObject.meals;
};

export const MealServiceFirstLetterAPI = async (firstLetter) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(endpoint);
  const responseObject = await response.json();
  return responseObject.meals;
};
