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

export default {
  ingredient: BeverageServiceIngredientsAPI,
  name: BeverageServiceNameAPI,
  letter: BeverageServiceFirstLetterAPI,
  surpriseDrink: SurpriseDrinksAPI,
  getByCategory: () => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((res) => res.json())
    .then((res) => res.drinks),
  getByDefault: () => fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((res) => res.json())
    .then((res) => res.drinks),
};
