const ingredientesRacipes = {
  meals: 'www.themealdb.com/api/json/v1/1/list.php?i=list',
  drinks: 'www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
};

const RandomRacipe = async (recipe) => {
  const response = await fetch(ingredientesRacipes[recipe]);
  const result = response.json();
  return response.ok ? Promise.resolve(result) : Promise.reject(result);
};

export default RandomRacipe;
