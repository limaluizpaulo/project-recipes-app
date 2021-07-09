// const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;

const ingredientsAPI = async (filter, search, mealOrDrink = 'meals') => {
  if (filter === 'f' && search.length > 1) {
    global.alert('Sua busca deve conter somente 1 (um) caracter');
    return;
  }
  const typeSearch = (filter === 'i') ? 'filter' : 'search';
  const db = (mealOrDrink === 'meals') ? 'meal' : 'cocktail';
  const fetchAPI = await fetch(`https://www.the${db}db.com/api/json/v1/1/${typeSearch}.php?${filter}=${search}`);
  const response = await fetchAPI.json();

  if (response[mealOrDrink] === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return;
  }

  const resLength = 12;

  return (response[mealOrDrink].filter((res, i) => i < resLength));
};

export default ingredientsAPI;

// https://www.themealdb.com/api/json/v1/1/search.php?f=a
// https://www.themealdb.com/api/json/v1/1/filter.php?f=a
