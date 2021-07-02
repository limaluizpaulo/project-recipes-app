function fetchAPI(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => response)
    .catch(() => {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return {};
    });
}

export default fetchAPI;
