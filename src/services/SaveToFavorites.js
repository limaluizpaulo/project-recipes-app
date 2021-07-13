import saveWithFavorites from './SaveWithFavorites';

function saveToFavorites(props) {
  const { url, food, recipe, setFavorite } = props;
  const favorites = localStorage.getItem('favoriteRecipes');
  if (favorites) {
    saveWithFavorites({ url, food, recipe, setFavorite });
  } else if (url.match(food) && !favorites) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: recipe.idMeal,
      type: 'comidas',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    }]));
    setFavorite(true);
  } else if (!favorites) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: recipe.idDrink,
      type: 'bebidas',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    }]));
    setFavorite(true);
  }
}

export default saveToFavorites;
