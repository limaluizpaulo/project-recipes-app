export const setLocalStorage = (id, recipeType) => {
  let currData = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!currData) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      [recipeType]: {
        [id]: [],
      },

    }));
  }
  currData = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (!currData[recipeType]) {
    const saved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      [recipeType]: {
        [id]: [],
      },
      ...saved,

    }));
  }

  currData = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (!currData[recipeType][id]) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: currData.meals,
      cocktails: currData.cocktails,
      [recipeType]: {
        ...currData[recipeType],
        [id]: [],
      },
    }));
  }
};

export const checkLocalStorage = (id, index, recipeType) => {
  setLocalStorage(id, recipeType);
  const arr = JSON.parse(localStorage.getItem('inProgressRecipes'))[recipeType];
  return arr[id].some((el) => el === index);
};

export const updateLocalStorage = (param) => {
  const { idx, recipeType, id, setIsBtnDisable, arr } = param;
  const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { cocktails, meals } = data;
  if (recipeType === 'meals') {
    meals[id].push(idx);
  }
  if (recipeType === 'cocktails') {
    cocktails[id].push(idx);
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    cocktails,
    meals,
  }));
  const storageUpdated = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (storageUpdated[recipeType][id].length >= arr.length) {
    setIsBtnDisable(false);
  } else {
    setIsBtnDisable(true);
  }
};
