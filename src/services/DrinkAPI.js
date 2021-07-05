function fetchDrink(endpoint) {
  return fetch(`${endpoint}`)
    .then((res) => res.json())
    .then((res) => res.drinks);
}

export default fetchDrink;
