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

export function getIngredients(typeRecipe, idRecipe) {
  const mealsOrCocktails = ((typeRecipe === 'comidas') ? 'meals' : 'cocktails');
  const receitasEmProgresso = getItemLocalStorage('inProgressRecipes');
  if (!receitasEmProgresso) {
    setItemLocalStorage('inProgressRecipes', { cocktails: {}, meals: {} });
    return [];
  }

  if (!receitasEmProgresso[mealsOrCocktails][idRecipe]) {
    return [];
  }
  return receitasEmProgresso[mealsOrCocktails][idRecipe];
}

export function addIngredients(typeRecipe, idRecipe, ingredient) {
  const mealsOrCocktails = ((typeRecipe === 'comidas') ? 'meals' : 'cocktails');
  const receitasEmProgresso = getItemLocalStorage('inProgressRecipes');
  if (!receitasEmProgresso[mealsOrCocktails][idRecipe]) {
    setItemLocalStorage('inProgressRecipes', {
      ...receitasEmProgresso,
      [mealsOrCocktails]: {
        ...receitasEmProgresso[mealsOrCocktails],
        [idRecipe]: [ingredient],
      },
    });
  } else {
    setItemLocalStorage('inProgressRecipes', {
      ...receitasEmProgresso,
      [mealsOrCocktails]: {
        ...receitasEmProgresso[mealsOrCocktails],
        [idRecipe]: [...receitasEmProgresso[mealsOrCocktails][idRecipe], ingredient],
      },
    });
  }
}

export function removeIngredient(typeRecipe, idRecipe, ingredient) {
  const mealsOrCocktails = ((typeRecipe === 'comidas') ? 'meals' : 'cocktails');
  const receitasEmProgresso = getItemLocalStorage('inProgressRecipes');
  setItemLocalStorage('inProgressRecipes', {
    ...receitasEmProgresso,
    [mealsOrCocktails]: {
      ...receitasEmProgresso[mealsOrCocktails],
      [idRecipe]: receitasEmProgresso[mealsOrCocktails][idRecipe]
        .filter((ingredientInProgress) => ingredientInProgress !== ingredient),
    },
  });
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
  const favoriteRecipes = getItemLocalStorage('favoriteRecipes');
  setItemLocalStorage('favoriteRecipes', [...favoriteRecipes, recipe]);
}

export function removeFavoriteRecipes(typeRecipe, idRecipe) {
  const favoriteRecipes = getItemLocalStorage('favoriteRecipes');
  const newFavoriteRecipes = favoriteRecipes
    .filter(({ id, type }) => !(id === idRecipe && type === typeRecipe));
  setItemLocalStorage('favoriteRecipes', newFavoriteRecipes);
}

export function addDoneRecipes(recipe) {
  const doneRecipes = getItemLocalStorage('doneRecipes');
  if (!doneRecipes) {
    setItemLocalStorage('doneRecipes', [recipe]);
  } else {
    setItemLocalStorage('doneRecipes', [...doneRecipes, recipe]);
  }
}

export function isDone(idRecipe) {
  const doneRecipes = getItemLocalStorage('doneRecipes');
  if (!doneRecipes) {
    setItemLocalStorage('doneRecipes', []);
    return false;
  }
  return doneRecipes.some((doneRecipe) => doneRecipe.id === idRecipe);
}

export function isInProgress(typeRecipe, idRecipe) {
  const inProgressRecipes = getItemLocalStorage('inProgressRecipes');
  const mealsOrCocktails = ((typeRecipe === 'comidas') ? 'meals' : 'cocktails');
  if (!inProgressRecipes) {
    return false;
  }

  if (inProgressRecipes[mealsOrCocktails][idRecipe]) {
    return true;
  }
}
