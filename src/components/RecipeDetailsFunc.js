export function setFavoriteRecipes(recipe, title) {
  const favorite = {
    id: recipe.idDrink || recipe.idMeal,
    type: title === 'Comidas' ? 'comida' : 'bebida',
    area: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
  };

  if (localStorage.favoriteRecipes) {
    const recipes = JSON.parse(localStorage.favoriteRecipes);
    const addFavorite = [...recipes, favorite];
    localStorage.favoriteRecipes = JSON.stringify(addFavorite);
    return addFavorite;
  }
  localStorage.favoriteRecipes = JSON.stringify([favorite]);
}

export function getFavoriteRecipes(id) {
  if (localStorage.favoriteRecipes) {
    const favorites = JSON.parse(localStorage.favoriteRecipes);
    const isFavorite = favorites.find((item) => item.id === id);
    if (isFavorite) {
      return true;
    }
  }
  return false;
}

export function removeFavoriteRecipe(id) {
  if (localStorage.favoriteRecipes) {
    const favorites = JSON.parse(localStorage.favoriteRecipes);
    const newFavorites = favorites.filter((item) => item.id !== id);
    localStorage.favoriteRecipes = JSON.stringify(newFavorites);
    return newFavorites;
  }
}

export function setDoneRecipes(recipe, pathname) {
  const verifyPath = pathname.includes('comida');
  let title = 'Bebidas';
  if (verifyPath) {
    title = 'Comidas';
  }
  // Source https://codare.aurelio.net/2009/04/03/javascript-obter-e-mostrar-data-e-hora/
  const date = new Date();
  const actualDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const tag = [];
  if (recipe.strTags !== null) {
    tag.push(recipe.strTags);
  }

  const done = {
    id: recipe.idDrink || recipe.idMeal,
    type: title === 'Comidas' ? 'comida' : 'bebida',
    area: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
    doneDate: actualDate,
    tags: tag || [],
  };

  if (localStorage.doneRecipes) {
    const recipes = JSON.parse(localStorage.doneRecipes);
    const addDone = [...recipes, done];
    localStorage.doneRecipes = JSON.stringify(addDone);
    return addDone;
  }
  localStorage.doneRecipes = JSON.stringify([done]);
}
