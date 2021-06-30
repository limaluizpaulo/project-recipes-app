const MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const fetchFood = async (url, id) => {
  try {
    const res = await (await fetch(url + id)).json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

const getFoodFromUrlParams = (id, location) => {
  let res;
  switch (location) {
  case 'comidas':
    res = fetchFood(MEAL_URL, id);
    break;
  case 'bebidas':
    res = fetchFood(DRINK_URL, id);
    break;
  default:
    res = undefined;
  }
  return res;
};

export default getFoodFromUrlParams;
