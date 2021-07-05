const URL_BASE_CATEGORIES_MEAL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const URL_BASE_CATEGORIES_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export async function requestCategoriesMael(name) {
  const fetchCategories = await fetch(`${URL_BASE_CATEGORIES_MEAL}${name}`);

  try {
    const response = await fetchCategories.json();
    return response;
  } catch (erro) {
    console.log(erro);
  }
}

export async function requestCategoriesDrink(name) {
  const fetchCategories = await fetch(`${URL_BASE_CATEGORIES_DRINK}${name}`);

  try {
    const response = await fetchCategories.json();
    return response;
  } catch (erro) {
    console.log(erro);
  }
}
