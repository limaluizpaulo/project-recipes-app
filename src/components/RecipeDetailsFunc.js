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
