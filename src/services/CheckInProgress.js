function checkInProgress(params) {
  const {
    url,
    food,
    recipe,
    inProgress,
    setInProgress,
  } = params;
  if (localStorage.getItem('inProgressRecipes')) {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (url.match(food) && !inProgress && recipesInProgress.meals) {
      const mealsKeys = Object.keys(recipesInProgress.meals);
      mealsKeys.forEach((key) => {
        if (recipe.idMeal === key) {
          setInProgress(true);
        }
      });
    } else if (!inProgress && recipesInProgress.cocktails) {
      const cocktailsKeys = Object.keys(recipesInProgress.cocktails);
      cocktailsKeys.forEach((key) => {
        if (recipe.idDrink === key) {
          setInProgress(true);
        }
      });
    }
  }
}

export default checkInProgress;
