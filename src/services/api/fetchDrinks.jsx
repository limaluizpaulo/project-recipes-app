const fetchDrinks = () => {
  const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  return fetch(MEALS_URL)
    .then((res) => res.json())
    .then(({ meals }) => meals);
};

export default fetchDrinks;
