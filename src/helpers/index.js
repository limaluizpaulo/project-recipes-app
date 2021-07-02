// Créditos à Lucas Martins - Turma 10 - Tribo B
export function invokeAlert(message, fn = alert) {
  fn(message);
}

export function urlToEmbed(url) {
  if (!url) return null;
  return `https://www.youtube.com/embed/${url.split('=')[1]}`;
}

export function toggleFavorite(params) {
  const { favorites, setFavorites, recipe } = params;
  const isDrinks = Object.keys(recipe).includes('idDrink');
  const idKey = isDrinks ? 'idDrink' : 'idMeal';
  const typeCypress = isDrinks ? 'bebida' : 'comida';
  const nameKey = isDrinks ? 'strDrink' : 'strMeal';
  const imgKey = isDrinks ? 'strDrinkThumb' : 'strMealThumb';

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
