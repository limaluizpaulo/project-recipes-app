export async function fetchCocktailsApi({ searchText, filter }) {
  if (filter === 'ingredient') {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i${searchText}`);
    const { cocktails } = await request.json();
    return cocktails == null ? [] : cocktails;
  }
  if (filter === 'name') {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`);
    const { cocktails } = await request.json();
    return cocktails == null ? [] : cocktails;
  }
  if (filter === 'firstLetter') {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`);
    const { cocktails } = await request.json();
    return cocktails == null ? [] : cocktails;
  }
}

export async function fetchCocktailsRecomendation() {
  const request = await fetch('www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { cocktails } = await request.json();
  return cocktails;
}
