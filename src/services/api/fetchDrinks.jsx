const fetchDrinks = () => {
  const MEALS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  return fetch(MEALS_URL)
    .then((res) => res.json())
    .then(({ drinks }) => drinks);
};

export default fetchDrinks;
