function fetchAPI(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => response);
}

export default fetchAPI;
