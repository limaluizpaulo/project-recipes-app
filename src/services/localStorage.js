export function initializeLocalStorage(email) {
  const initialData = [
    { key: 'mealsToken', keyValue: 1 },
    { key: 'cocktailsToken', keyValue: 1 },
    { key: 'user', keyValue: { email } },
    { key: 'doneRecipes', keyValue: [] },
    { key: 'favoriteRecipes', keyValue: [] },
    { key: 'inProgressRecipes', keyValue: { cocktails: {}, meals: {} } },
  ];

  initialData.forEach(({ key, keyValue }) => {
    const stringifyValue = JSON.stringify(keyValue);
    localStorage.setItem(key, stringifyValue);
  });
}

// Setar item no LocalStorage
export function setItemLocalStorage(key, value) {
  let result = value;

  if (key !== 'mealsToken' || key !== 'cocktailsToken') {
    result = JSON.stringify(value);
  }

  localStorage.setItem(key, result);
}

// Pegar item pro localStorage
export function getItemLocalStorage(key) {
  let result = localStorage.getItem(key);

  if (key !== 'mealsToken' || key !== 'cocktailsToken') {
    result = JSON.parse(result);
  }

  return result;
}

export function addIngredients(typeRecipe, idRecipe, ingredientsInProgressArr) {
  const mealsOrCocktails = ((typeRecipe === 'comidas') ? 'meals' : 'cocktails');
  const receitasEmProgresso = getItemLocalStorage('inProgressRecipes');
  setItemLocalStorage('inProgressRecipes', {
    ...receitasEmProgresso,
    [mealsOrCocktails]: {
      ...receitasEmProgresso[mealsOrCocktails],
      [idRecipe]: ingredientsInProgressArr,
    },
  });
}

export function getIngredients(typeRecipe, idRecipe) {
  const mealsOrCocktails = ((typeRecipe === 'comidas') ? 'meals' : 'cocktails');
  const receitasEmProgresso = getItemLocalStorage('inProgressRecipes');
  if (!receitasEmProgresso) {
    setItemLocalStorage('inProgressRecipes', { cocktails: {}, meals: {} });
    return undefined;
  }
  return receitasEmProgresso[mealsOrCocktails][idRecipe];
}

export function haveFavoriteRecipes(typeRecipe, idRecipe) {
  const favoriteRecipes = getItemLocalStorage('favoriteRecipes');
  if (!favoriteRecipes) {
    setItemLocalStorage('favoriteRecipes', []);
    return false;
  }
  return favoriteRecipes.some(({ id, type }) => id === idRecipe && type === typeRecipe);
}

export function addFavoriteRecipes(recipe) {
  // const lengthPropsRecipe = Object.keys(recipe).length;
  const favoriteRecipes = getItemLocalStorage('favoriteRecipes');
  setItemLocalStorage('favoriteRecipes', [...favoriteRecipes, recipe]);
}

export function removeFavoriteRecipes(typeRecipe, idRecipe) {
  const favoriteRecipes = getItemLocalStorage('favoriteRecipes');
  const newFavoriteRecipes = favoriteRecipes
    .filter(({ id, type }) => !(id === idRecipe && type === typeRecipe));
  setItemLocalStorage('favoriteRecipes', newFavoriteRecipes);
}
