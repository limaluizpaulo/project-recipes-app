export const fetchIngredientes = async (ingrediente) => {
  const ingredientes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const { meals } = await ingredientes.json();
  return meals;
};

export const fetchNome = async (nome) => {
  const nomeAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const { meals } = await nomeAPI.json();
  return meals;
};

export const fetchFirstLetter = async (first) => {
  const firstLetter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${first}`);
  const { meals } = await firstLetter.json();
  return meals;
};
