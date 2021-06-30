export async function fetchMealApi({ searchText, filter }) {
  if (filter === 'ingredient') {
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
      .then((data) => data.json());
    return apiResponse.meals;
  }
  if (filter === 'name') {
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
      .then((data) => data.json());
    return apiResponse.meals;
  }
  if (filter === 'firstLetter') {
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`)
      .then((data) => data.json());
    return apiResponse.meals;
  }
}

export async function fetchMealRecomendation() {
  const apiResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((data) => data.json());
  return apiResponse.meals;
}
