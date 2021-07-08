import {
  fetchByIngredient,
  fetchByName,
  fetchByFirstLetter,
  fetchDetails,
  fetchRandom,
} from '../services';

// Créditos à Lucas Martins - Turma 10 - Tribo B
export function invokeAlert(message, fn = alert) {
  fn(message);
}

export function setConstants(isDrinks) {
  return ({
    idKey: isDrinks ? 'idDrink' : 'idMeal',
    imgKey: isDrinks ? 'strDrinkThumb' : 'strMealThumb',
    localStorageKey: isDrinks ? 'cocktails' : 'meals',
    nameKey: isDrinks ? 'strDrink' : 'strMeal',
    title: isDrinks ? 'Bebidas' : 'Comidas',
    type: isDrinks ? 'drinks' : 'meals',
    typeCypress: isDrinks ? 'bebida' : 'comida',
    typePt: isDrinks ? 'bebidas' : 'comidas',
  });
}

export function urlToEmbed(url) {
  if (!url) return null;
  return url.replace('watch?v=', 'embed/');
}

export async function getDetails(params) {
  const { isRandom, id, type, setDetails } = params;
  const result = isRandom
    ? await fetchRandom(type)
    : await fetchDetails(type, id);
  if (!result) return [];
  setDetails(result);
  return result;
}

export async function getFilteredRecipes(params) {
  const { filter, searchTerm, type, setFn } = params;
  let result;

  if (filter === 'ingredient') {
    result = await fetchByIngredient(type, searchTerm);
  } else if (filter === 'name') {
    result = await fetchByName(type, searchTerm);
  } else if (searchTerm.length === 1) {
    result = await fetchByFirstLetter(type, searchTerm);
  } else {
    invokeAlert('Sua busca deve conter somente 1 (um) caracter');
    return [];
  }

  if (!result) {
    invokeAlert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return [];
  }

  setFn(result);
  return result;
}

export async function getRecipes(params) {
  const { type, setFn } = params;
  const result = await fetchByName(type);
  if (result) setFn(result);
}

export function toggleIngredient(params) {
  const { ingredient, inProgress, setInProgress, recipe } = params;
  const isDrinks = Object.keys(recipe).includes('idDrink');
  const { idKey, localStorageKey } = setConstants(isDrinks);
  const id = recipe[idKey];
  const usedIngredients = inProgress[localStorageKey][id] || [];
  const wasUsed = usedIngredients.includes(ingredient);

  if (wasUsed) {
    const index = usedIngredients.findIndex((item) => item === ingredient);
    usedIngredients.splice(index, 1);
  } else {
    usedIngredients.push(ingredient);
  }

  const newObj = { ...inProgress };
  newObj[localStorageKey][id] = usedIngredients;
  setInProgress(newObj);
}

export function toggleFavorite(params) {
  const { favorites, setFavorites, recipe } = params;
  const isDrinks = Object.keys(recipe).includes('idDrink');
  const { idKey, imgKey, nameKey, typeCypress } = setConstants(isDrinks);

  const formattedRecipe = {
    alcoholicOrNot: recipe.strAlcoholic || '',
    area: recipe.strArea || '',
    category: recipe.strCategory,
    id: recipe[idKey],
    image: recipe[imgKey],
    name: recipe[nameKey],
    type: typeCypress,
  };

  const isFavorite = favorites.some((item) => item.id === recipe[idKey]);
  const favoriteRecipes = isFavorite
    ? favorites.filter((item) => item.id !== formattedRecipe.id)
    : favorites.concat(formattedRecipe);
  setFavorites(favoriteRecipes);
}
