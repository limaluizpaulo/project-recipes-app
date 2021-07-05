export const setToken = (email) => {
  localStorage.mealsToken = 1;
  localStorage.cocktailsToken = 1;
  localStorage.user = JSON.stringify({ email });
};

export const checkRecypeId = (idRecipe) => {
  const dones = localStorage.doneRecipes ? JSON.parse(localStorage.doneRecipes) : [];
  return dones.find(({ id }) => id === idRecipe);
};

export const checkProgress = (idRecipe, meals) => {
  const recipe = meals ? 'meals' : 'cocktails';
  return localStorage.inProgressRecipes
  && JSON.parse(localStorage.inProgressRecipes)[recipe][idRecipe];
};
