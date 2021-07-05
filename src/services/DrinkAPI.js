function fetchDrink(endpoint, query) {
  return fetch(`${endpoint}${query}`)
    .then((res) => res.json())
    .then((res) => res.drinks);
}

export default fetchDrink;
