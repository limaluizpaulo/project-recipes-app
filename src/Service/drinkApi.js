export const fetchIdDrink = async (id) => {
  const drinkDetails = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await drinkDetails.json();
  return drinks;
};

export const fetchDrinkCategori = async () => {
  const categoryDirnks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const { drinks } = await categoryDirnks.json();
  return drinks;
};

export const fetchAllDrinks = async () => {
  const allDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await allDrinks.json();
  return drinks;
};

export const fetchIngredientesDrinks = async (ingrediente) => {
  const ingredientes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const { drinks } = await ingredientes.json();
  return drinks;
};

export const fetchNomeDrinks = async (nome) => {
  const nomeAPI = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
  const { drinks } = await nomeAPI.json();
  return drinks;
};

export const fetchFirstLetterDrinks = async (first) => {
  const firstLetter = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${first}`);
  const { drinks } = await firstLetter.json();
  return drinks;
};

export const fetchTypeCategoryFilter = async (category) => {
  const typeCategory = await
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const { drinks } = await typeCategory.json();
  return drinks;
};

export const fetchRandomDrink = async () => {
  const randomDrink = await
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const { drinks } = await randomDrink.json();
  return drinks;
};

export const fetchDrinksIngredients = async () => {
  const allIngredients = await
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const { drinks } = await allIngredients.json();
  return drinks;
};
