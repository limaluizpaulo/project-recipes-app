function fetchFood(endpoint, query) {
  return fetch(`${endpoint}${query}`)
    .then((res) => res.json())
    .then((res) => res.meals);
}

export default fetchFood;
