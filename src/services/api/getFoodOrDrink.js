const MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const DRINK_URL_ALTERNATIVE = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const MEAL_URL_ALTERNATIVE = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const fetchFood = async (url, id) => {
  try {
    if (id) {
      const res = await (await fetch(url + id)).json();
      return res;
    }
    const res = await (await fetch(url)).json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

const getFoodFromUrlParams = (location, id) => {
  let res;
  switch (location) {
  case 'comidas':
    res = fetchFood(MEAL_URL, id);
    break;
  case 'bebidas':
    res = fetchFood(DRINK_URL, id);
    break;
  case 'comidasAlternativas':
    res = fetchFood(MEAL_URL_ALTERNATIVE);
    break;
  case 'bebidasAlternativas':
    res = fetchFood(DRINK_URL_ALTERNATIVE);
    break;
  default:
    res = undefined;
  }
  return res;
};

export default getFoodFromUrlParams;
