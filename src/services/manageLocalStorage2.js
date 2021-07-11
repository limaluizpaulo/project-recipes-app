export const settingFavorite2 = (details, id, refresh) => {
  console.log('details', details);
  console.log('id', id);
  const favoritesArrayVerifier = localStorage.getItem('favoriteRecipes');
  if (!favoritesArrayVerifier) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const rawFavoritesArray = localStorage.getItem('favoriteRecipes');
  const favoritesArray = JSON.parse(rawFavoritesArray);
  let favoriteObject = {};
  const { type, area, category, alcoholicOrNot, name, image } = details;
  favoriteObject = {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
  };

  if (!favoritesArray.find((obj) => obj.id === id)) {
    favoritesArray.push(favoriteObject);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesArray));
  } else {
    const RemovedFavoriteArray = favoritesArray.filter((obj) => obj.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(RemovedFavoriteArray));
  }
  return !refresh;
};

export const nextFn = () => {};
