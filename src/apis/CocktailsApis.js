export async function fetchCocktailsApi({ searchText, filter }) {
  if (filter === 'ingredient') {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText}`);
    const { drinks } = await request.json();
    return drinks === null ? [] : drinks;
  }
  if (filter === 'name') {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`);
    const { drinks } = await request.json();
    return drinks === null ? [] : drinks;
  }
  if (filter === 'firstLetter') {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`);
    const { drinks } = await request.json();
    return drinks === null ? [] : drinks;
  }
}

export async function fetchCocktailsRecomendation() {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await request.json();
  return drinks;
}

export async function fetchDrinksById(id) {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await request.json();
  return drinks;
}
