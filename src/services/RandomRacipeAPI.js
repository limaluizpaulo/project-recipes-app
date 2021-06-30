const randomRacipesUrl = {
  foods: 'https://www.themealdb.com/api/json/v1/1/random.php',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
};

const RandomRacipe = async (recipe) => {
  const response = await fetch(randomRacipesUrl[recipe]);
  const result = response.json();
  return response.ok ? Promise.resolve(result) : Promise.reject(result);
};

export default RandomRacipe;
