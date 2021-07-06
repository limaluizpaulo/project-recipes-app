export const setList = (array1, array2) => {
  if (array1) {
    const list = array1.length ? array1 : array2;
    const arrayCopy = [...list];
    const twelveItems = 12;
    const finalList = arrayCopy.splice(0, twelveItems);
    return finalList;
  }
  return [];
};

export const listByCategories = (category, type) => {
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
