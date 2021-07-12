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
  const existProgressRecipes = localStorage.getItem('inProgressRecipes');
  if (existProgressRecipes) {
    const progressRecipesObj = JSON.parse(existProgressRecipes);
    progressRecipesObj[type][id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipesObj));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  }
}
