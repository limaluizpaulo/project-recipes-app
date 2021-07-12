const APIPadrao = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const alertMessage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

const BeverageServiceIngredientsAPI = async (ingredient) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endpoint);
  try {
    const responseObject = await response.json();
    return [...responseObject.drinks];
  } catch (err) {
    global.alert(alertMessage);
  }
};

const BeverageServiceNameAPI = async (name) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(endpoint);
  try {
    const responseObject = await response.json();
    return [...responseObject.drinks];
  } catch (err) {
    global.alert(alertMessage);
  }
};

const BeverageServiceFirstLetterAPI = async (firstLetter) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(endpoint);
  try {
    const responseObject = await response.json();
    return responseObject.drinks;
  } catch (err) {
    global.alert(alertMessage);
  }
};

const SurpriseDrinksAPI = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(endpoint);
  try {
    const responseObject = await response.json();
    return responseObject.drinks;
  } catch (err) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.@@');
  }
};

const drinksIngredientsAPI = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(endpoint).then((data) => data.json());
  return response.drinks;
};

const getDrinkById = async (idDrink) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
  const response = await fetch(endpoint);
  const responseObject = await response.json();
  return responseObject.drinks;
};

export default {
  ingredient: BeverageServiceIngredientsAPI,
  name: BeverageServiceNameAPI,
  letter: BeverageServiceFirstLetterAPI,
  surpriseDrink: SurpriseDrinksAPI,
  getDrinkById,
  default: () => fetch(APIPadrao),
  drinksIngredient: drinksIngredientsAPI,
  getByCategory: () => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((res) => res.json())
    .then((res) => res.drinks),
  getByDefault: () => fetch(APIPadrao)
    .then((res) => res.json())
    .then((res) => res.drinks),
};
