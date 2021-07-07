export const makeRecipe = ({ url }, history) => {
  const mealOrDrink = url.split('/')[1];
  const id = url.split('/')[2];
  const mealCockTail = mealOrDrink === 'comidas' ? 'meals' : 'cocktails';
  const inProgressRecipes = {
    [mealCockTail]: {
      [id]: [],
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  history.push(`/comidas/${id}/in-progress`);
};

export const finishRecipe = () => {
  // history.push(`/comidas/${id}/in-progress`);
};
