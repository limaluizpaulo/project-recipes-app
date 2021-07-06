import { invokeAlert } from '.';
import {
  fetchByIngredient,
  fetchByName,
  fetchByFirstLetter,
} from '../services';

export async function getRecipes(params) {
  const { type, setFn } = params;
  const result = await fetchByName(type);
  setFn(result);
}

export async function getFilteredRecipes(params) {
  const { filter, type, searchTerm, setFn } = params;
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

export function toggleFavorite(params) {
  const { favorites, setFavorites, recipe } = params;
  const isDrink = Object.keys(recipe).includes('idDrink');
  const idKey = isDrink ? 'idDrink' : 'idMeal';
  const typeCypress = isDrink ? 'bebida' : 'comida';
  const nameKey = isDrink ? 'strDrink' : 'strMeal';
  const imgKey = isDrink ? 'strDrinkThumb' : 'strMealThumb';

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

export function toggleIngredient(params) {
  const { recipe, ingredient, inProgress, setInProgress } = params;
  const isDrink = Object.keys(recipe).includes('idDrink');
  const typeKey = isDrink ? 'cocktails' : 'meals';
  const idKey = isDrink ? 'idDrink' : 'idMeal';
  const id = recipe[idKey];
  const usedIngredients = inProgress[typeKey][id] || [];
  const wasUsed = usedIngredients.includes(ingredient);

  if (wasUsed) {
    const index = usedIngredients.findIndex((item) => item === ingredient);
    usedIngredients.splice(index, 1);
  } else {
    usedIngredients.push(ingredient);
  }

  const newObj = { ...inProgress };
  newObj[typeKey][id] = usedIngredients;
  setInProgress(newObj);
}
