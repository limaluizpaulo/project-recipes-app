const mealsURL = 'https://www.themealdb.com/api/json/v1/1/';
const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export default async function fetchRandomRecipe(isMeal) {
  try {
    const url = isMeal ? mealsURL : drinksURL;
    const key = isMeal ? 'meals' : 'drinks';
    const resultFetch = await fetch(`${url}random.php`);
    const resultJson = await resultFetch.json();
    return resultJson[key][0];
  } catch (err) {
    console.log(err);
  }
}
