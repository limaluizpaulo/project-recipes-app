export const setToken = (email) => {
  localStorage.mealsToken = 1;
  localStorage.cocktailsToken = 1;
  localStorage.user = JSON.stringify({ email });
};

export const setRecipe = () => false;
