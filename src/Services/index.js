const endpoint = 'https://themealdb.com/api/json/v1/1/search.php?s';

// 'www.thecocktaildb.com/api/json/v1/1/search.php?s';

const fetchComidasOuBebidas = () => (
  fetch(endpoint)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok
          ? Promise.resolve(json.meals) : Promise.reject(json)))
    ))
);

export default fetchComidasOuBebidas;
