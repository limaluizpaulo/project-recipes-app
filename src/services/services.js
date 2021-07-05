export const setList = (array1, array2) => {
  const list = array1.length ? array1 : array2;
  const arrayCopy = [...list];
  const twelveItems = 12;
  const finalList = arrayCopy.splice(0, twelveItems);
  return finalList;
};

export const listByCategories = (category, type) => {
  const list = type === 'meal' ? 'meals' : 'drinks';
  return fetch(`https://www.the${type}db.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((res) => res[list]);
};
