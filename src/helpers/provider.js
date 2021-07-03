import { invokeAlert } from '.';
import {
  fetchByIngredient,
  fetchByName,
  fetchByFirstLetter,
} from '../services';

export function toggleFavorite(params) {
  const { favorites, setFavorites, recipe } = params;
  const isDrink = Object.keys(recipe).includes('idDrink');
  const idKey = isDrink ? 'idDrink' : 'idMeal';
  const typeCypress = isDrink ? 'bebida' : 'comida';
  const nameKey = isDrink ? 'strDrink' : 'strMeal';
  const imgKey = isDrink ? 'strDrinkThumb' : 'strMealThumb';

  const formattedRecipe = {
    id: recipe[idKey],
    type: typeCypress,
    area: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe[nameKey],
    image: recipe[imgKey],
  };

  const isFavorite = favorites.some((item) => item.id === recipe[idKey]);
  const favoriteRecipes = isFavorite
    ? favorites.filter((item) => item.id !== formattedRecipe.id)
    : favorites.concat(formattedRecipe);
  setFavorites(favoriteRecipes);
}

export async function getRecipes(params) {
  const { setFn, filter, type, searchTerm } = params;

  let result;
  if (filter === 'ingredient') {
    result = await fetchByIngredient(type, searchTerm);
  } else if (filter === 'name') {
    result = await fetchByName(type, searchTerm);
  } else if (searchTerm.length === 1) {
    result = await fetchByFirstLetter(type, searchTerm);
  } else {
    invokeAlert('Sua busca deve conter somente 1 (um) caracter');
  }

  if (!result) {
    invokeAlert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return [];
  }
  setFn(result);
  return result;
}
