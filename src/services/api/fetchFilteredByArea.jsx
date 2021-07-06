const fetchFilteredByArea = (type, category) => {
  const search = (type === 'meals') ? 'meal' : 'cocktail';
  const MEALS_URL = `https://www.the${search}db.com/api/json/v1/1/filter.php?a=${category}`;
  return fetch(MEALS_URL)
    .then((res) => res.json())
    .then((res) => res[type]);
};

export default fetchFilteredByArea;
