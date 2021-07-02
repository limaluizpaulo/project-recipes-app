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
