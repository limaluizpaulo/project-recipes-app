const fetchCategories = (type = 'meals') => {
  const search = (type === 'meals') ? 'meal' : 'cocktail';
  const MEALS_URL = `https://www.the${search}db.com/api/json/v1/1/list.php?c=list`;
  return fetch(MEALS_URL)
    .then((res) => res.json())
    .then((res) => res[type])
    .then((res) => res.map(({ strCategory }) => strCategory));
};

export default fetchCategories;
