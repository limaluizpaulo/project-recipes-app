const mealsURL = 'https://www.themealdb.com/api/json/v1/1/';
const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export default async function fetchRandomRecipe(isMeal) {
  try {
    const url = isMeal ? mealsURL : drinksURL;
    const resultFetch = await fetch(`${url}random.php`);
    const resultJson = await resultFetch.json();
    return resultJson;
  } catch (err) {
    console.log(err);
  }
}
