export function saveMealsToken() {
  localStorage.setItem('mealsToken', 1);
}

export function saveCockTailsToken() {
  localStorage.setItem('cocktailsToken', 1);
}

export function saveUserEmail(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getMealsToken() {
  return localStorage.getItem('mealsToken');
}

export function getCockTailsToken() {
  return localStorage.getItem('cocktailsToken');
}

export function getUserEmail() {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
}

export const saveFavoriteRecipe = (id, path, content) => (title, img) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(
    [{ id,
      type: path.includes('bebidas') ? 'bebida' : 'comida',
      area: path.includes('bebidas') ? '' : content.strArea,
      category: content.strCategory,
      // alcoholicOrNot: path.includes('bebidas') ? 'Alcoholic' : '', //CONCERTAR!!!!!!
      name: content[title],
      image: content[img],
    }],
  ));
};
