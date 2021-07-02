export const setLocalStorage = (id) => {
  const localStorageDefault = {
    cocktails: {
      [id]: [],
    },
    meals: {
      [id]: [],
    },
  };
  if (!localStorage.getItem('inProgressRecipes')) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageDefault));
  }
};

export const checkLocalStorage = (id, index, recipeType) => {
  setLocalStorage(id); // creates a default when undefined
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
