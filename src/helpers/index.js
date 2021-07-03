// Créditos à Lucas Martins - Turma 10 - Tribo B
export function invokeAlert(message, fn = alert) {
  fn(message);
}

export function urlToEmbed(url) {
  if (!url) return null;
  return `https://www.youtube.com/embed/${url.split('=')[1]}`;
}

export function toggleFavorite(favorites, setFavorites, recipe) {
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
