export const fetchAPI = async (API, chosenFilter, searchText) => {
  try {
    const result = await fetch(API + chosenFilter + searchText)
      .then((res) => res.json());
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  const mealsPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinksPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  return Object.assign({}, ...await Promise.all([fetch(mealsPoint), fetch(drinksPoint)])
    .then((responses) => Promise.all(responses.map((res) => res.json()))));
};

export const categoryFilter = async (baseEndPoint, category) => {
  const categoryURL = `${baseEndPoint}filter.php?c=${category}`;
  const promiseCategory = await fetch(categoryURL);
  const result = await promiseCategory.json();
  console.log(result);
  return result;
};
