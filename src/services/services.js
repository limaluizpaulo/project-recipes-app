export const setList12 = (array) => {
  if (array) {
    const arrayCopy = [...array];
    const twelveItems = 12;
    const finalList = arrayCopy.splice(0, twelveItems);
    return finalList;
  }
  return [];
};

export const setList6 = (array) => {
  if (array) {
    const arrayCopy = [...array];
    const sixItems = 6;
    const finalList = arrayCopy.splice(0, sixItems);
    return finalList;
  }
  return [];
};

export const fetchCategories = (category, type) => {
  const list = type === 'meal' ? 'meals' : 'drinks';
  if (category === 'All') {
    return fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?s=`)
      .then((response) => response.json())
      .then((res) => res[list]);
  }
  return fetch(`https://www.the${type}db.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((res) => res[list]);
};

export function setProgressItem(id, type) {
  const obj = {
    [type]: { [id]: [] },
  };
  const existProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const existRecipeID = existProgressRecipes
    ? Object.keys(existProgressRecipes[type]).includes(id) : false;
  if (!existRecipeID) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  } else if (existRecipeID) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(existProgressRecipes));
  } else {
    const progressRecipesObj = JSON.parse(existProgressRecipes);
    progressRecipesObj[type][id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipesObj));
  }
}

export function saveFavorite(currentID, item, tp, setFavoriteIcon) {
  const text = tp === 'comida' ? 'Meal' : 'Drink';
  const strInfo = tp === 'bebida' ? item.strAlcoholic : '';
  const obj = {
    id: item[`id${text}`],
    type: tp,
    area: item.strArea || '',
    category: item.strCategory,
    alcoholicOrNot: strInfo,
    name: item[`str${text}`],
    image: item[`str${text}Thumb`],
  };

  const existFavorites = localStorage.getItem('favoriteRecipes');
  if (existFavorites) {
    const favoritesList = JSON.parse(existFavorites);
    const checkIDs = favoritesList.filter((el) => el.id === currentID);
    if (checkIDs.length) {
      const index = favoritesList.indexOf(checkIDs[0]);
      favoritesList.splice(index, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesList));
      setFavoriteIcon(false);
    } else {
      favoritesList.push(obj);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesList));
      setFavoriteIcon(true);
    }
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
    setFavoriteIcon(true);
  }
}

export function isFavoriteIcon(currentID) {
  const existFavorites = localStorage.getItem('favoriteRecipes');
  if (existFavorites) {
    const favoritesList = JSON.parse(existFavorites);
    const checkIDs = favoritesList.filter((el) => el.id === currentID);
    if (checkIDs.length) {
      return true;
    }
    return false;
  }
  return false;
}

export function setValue(params) {
  const { ide, value, id, recipe, isChecked, classes, setClasses } = params;
  const savedRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (savedRecipe && isChecked(ide)) {
    const isIncludes = savedRecipe[recipe][id].includes(value);
    if (!isIncludes) {
      savedRecipe[recipe][id].push(value);
      localStorage.setItem('inProgressRecipes', JSON.stringify(savedRecipe));
      setClasses({
        ...classes,
        [value]: ['striped', true],
      });
    }
  } else if (!savedRecipe) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      [recipe]: {
        [id]: [value],
      },
    }));
    setClasses({
      ...classes,
      [value]: ['striped', true],
    });
  } else {
    const index = savedRecipe[recipe][id].indexOf(value);
    savedRecipe[recipe][id].splice(index, 1);
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedRecipe));
    setClasses({
      ...classes,
      [value]: ['normal', false],
    });
  }
}
