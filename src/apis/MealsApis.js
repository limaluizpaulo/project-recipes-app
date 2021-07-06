export async function fetchMealsApi({ searchText, filter }) {
  if (filter === 'ingredient') {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`);
    const { meals } = await request.json();
    return meals == null ? [] : meals;
  }
  if (filter === 'name') {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
    const { meals } = await request.json();
    return meals == null ? [] : meals;
  }
  if (filter === 'firstLetter') {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`);
    const { meals } = await request.json();
    return meals == null ? [] : meals;
  }
}

export async function fetchMealsRecomendation() {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await request.json();
  return meals;
}

export async function fetchMealsById(id) {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { meals } = await request.json();
  return meals;
}

export async function fetchMealsCategories() {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const { meals } = await request.json();
  return meals;
}
