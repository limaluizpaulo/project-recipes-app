function checkFavorite(params) {
  const {
    url,
    food,
    recipe,
    favorite,
    setFavorite,
  } = params;
  console.log(recipe);
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (url.match(food) && favorites) {
    favorites.forEach((favoriteItem) => {
      if (recipe.idMeal === favoriteItem.id && favorite === false) {
        setFavorite(true);
      }
    });
  } else if (favorites) {
    favorites.forEach((favoriteItem) => {
      if (recipe.idDrink === favoriteItem.id && favorite === false) {
        setFavorite(true);
      }
    });
  }
}

export default checkFavorite;
