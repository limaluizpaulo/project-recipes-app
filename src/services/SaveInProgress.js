function saveInProgress(props) {
  const { recipe, url, food, setInProgress } = props;
  const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const object = Object.entries(recipe);
  const recipeIngredients = object.filter((entry) => (
    entry[0].match(/strIngredient/) && entry[1] !== '' && entry[1] !== null));
  const amountOfIngredients = Object.keys(recipeIngredients);
  if (url.match(food)) {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({
        ...recipeInProgress,
        meals: {
          [recipe.idMeal]: [...amountOfIngredients],
        },
      }));
    setInProgress(true);
  } else {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({
        ...recipeInProgress,
        cocktails: {
          [recipe.idDrink]: [...amountOfIngredients],
        },
      }));
    setInProgress(true);
  }
}

export default saveInProgress;
