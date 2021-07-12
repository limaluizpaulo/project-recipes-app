export const settingFavorite2 = (details, id, refresh) => {
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

export const getEmail = () => {
  const rawEmail = localStorage.getItem('user');
  const email = JSON.parse(rawEmail);
  if (!email) {
    return 'Sem email cadastrado. O usuário chegou até aqui driblando a tela de login...';
  }
  return email.email;
};

export const clearStorageAndPushToLogin = (history) => {
  localStorage.clear();
  history.push('/');
};
