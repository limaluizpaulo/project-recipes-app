export function handleFavorite({ id, type, area = '', category = '', alcoholicOrNot = '',
  name, image }, isFavorite) {
  const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (!isFavorite) {
    const favRecipe = {
      id,
      type,
      area,
      category,
      alcoholicOrNot,
      name,
      image,
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipes, favRecipe]));
  } else {
    const favIndex = favRecipes.indexOf(favRecipes.find((favId) => favId.id === id));
    const newStorage = [...favRecipes.slice(0, favIndex),
      ...favRecipes.slice(favIndex + 1)];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
}

export function checkListIngredients({ checked, index, id, countChecked }, key) {
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { cocktails: { [id]: [] }, meals: { [id]: [] } };
  if (checked) {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify(
        {
          ...recipesInProgress,
          [key]: {
            ...recipesInProgress[key],
            [id]: [...recipesInProgress[key][id], index],
          },
        },
      ));
    return countChecked + 1;
  }
  let ingredientsList = recipesInProgress[key][id];
  const ingredientIndex = ingredientsList.indexOf(index);
  ingredientsList = [...ingredientsList.slice(0, ingredientIndex),
    ...ingredientsList.slice(ingredientIndex + 1)];
  localStorage.setItem('inProgressRecipes',
    JSON.stringify(
      {
        ...recipesInProgress,
        [key]: {
          ...recipesInProgress[key],
          [id]: ingredientsList,
        },
      },
    ));
  return countChecked - 1;
}

export function handleDoneRecipes({ id, type, area = '', category = '',
  alcoholicOrNot = '', name, image, strTags = '' }) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const doneRecipeExists = doneRecipes.some((doneId) => doneId.id === id);
  if (!doneRecipeExists) {
    const tags = strTags ? strTags.split(',') : [];
    const doneDate = new Date().toLocaleDateString();
    localStorage.setItem('doneRecipes', JSON.stringify(
      [...doneRecipes,
        { id, type, area, category, alcoholicOrNot, name, image, doneDate, tags },
      ],
    ));
  }
  // const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  // const inProgressIndex = recipesInProgress.meals.indexOf(recipesInProgress.meals
  //   .find((mealId) => mealId === id));

  // const newStorage = [...favRecipes.slice(0, favIndex),
  //   ...favRecipes.slice(favIndex + 1)];
  // localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
}
