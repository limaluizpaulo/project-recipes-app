export function saveUserEmail(user) {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserEmail() {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
}

export const saveFavoriteRecipe = (id, path, content) => (title, img) => {
  if (localStorage.getItem('favoriteRecipes')) {
    const arrayFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(arrayFavorites);
    arrayFavorites.push({ id,
      type: path.includes('bebidas') ? 'bebida' : 'comida',
      area: path.includes('bebidas') ? '' : content.strArea,
      category: content.strCategory,
      alcoholicOrNot: path.includes('bebidas') ? content.strAlcoholic : '',
      name: content[title],
      image: content[img],
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavorites));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [{ id,
        type: path.includes('bebidas') ? 'bebida' : 'comida',
        area: path.includes('bebidas') ? '' : content.strArea,
        category: content.strCategory,
        alcoholicOrNot: path.includes('bebidas') ? content.strAlcoholic : '',
        name: content[title],
        image: content[img],
      }],
    ));
  }
};
