const APIPadrao = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const alertMessage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
const MealServiceIngredientsAPI = async (ingredient) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endpoint);
  try {
    const responseObject = await response.json();
    return [...responseObject.meals];
  } catch (err) {
    global.alert(alertMessage);
  }
};

const MealServiceNameAPI = async (name) => {
  const endpoint = `${APIPadrao}${name}`;
  const response = await fetch(endpoint);
  try {
    const responseObject = await response.json();
    return [...responseObject.meals];
  } catch (err) {
    global.alert(alertMessage);
  }
};

const MealServiceFirstLetterAPI = async (firstLetter) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(endpoint);
  try {
    const responseObject = await response.json();
    return responseObject.meals;
  } catch (err) {
    global.alert(alertMessage);
  }
};

const SurpriseFoodAPI = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  console.log('SurpriseAPIFoods');
  const response = await fetch(endpoint);
  const responseObject = await response.json();
  console.log(responseObject);
  return responseObject.meals;
};

const getFoodById = async (idFood) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`;
  const response = await fetch(endpoint);
  const responseObject = await response.json();
  return responseObject.meals;
};

const foodIngredientsAPI = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(endpoint);
  const responseObject = await response.json();
  return responseObject.meals;
};

const MealServiceAreaAPI = async (area) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const response = await fetch(endpoint);
  try {
    const responseObject = await response.json();
    return [...responseObject.meals];
  } catch (err) {
    global.alert(alertMessage);
  }
};

export default {
  ingredient: MealServiceIngredientsAPI,
  name: MealServiceNameAPI,
  letter: MealServiceFirstLetterAPI,
  surpriseFood: SurpriseFoodAPI,
  getFoodById,
  default: () => fetch(APIPadrao),
  foodIngredients: foodIngredientsAPI,
  foodsArea: MealServiceAreaAPI,
  getByCategory: () => fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((res) => res.json())
    .then((res) => res.meals),
  getByDefault: () => fetch(APIPadrao)
    .then((res) => res.json())
    .then((res) => res.meals),
};
