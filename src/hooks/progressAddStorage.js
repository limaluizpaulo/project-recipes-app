function progressRecipeStorage(id, text) {
  if (!localStorage.getItem('inProgressRecipes') && document.URL.includes('comidas')) {
    const local = { cocktails: {}, meals: { [id]: [] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(local));
    return local.meals[id];
  }
  if (!localStorage.getItem('inProgressRecipes') && document.URL.includes('bebidas')) {
    const local = { cocktails: { [id]: [] }, meals: {} };
    localStorage.setItem('inProgressRecipes', JSON.stringify(local));
    return local.cocktails[id];
  }
  if (document.URL.includes('comidas') && text === undefined) {
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const progress = { ...local,
      meals:
      { ...local.meals, [id]: [...local.meals[id]] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
    return progress.meals[id];
  }
  if (document.URL.includes('bebidas') && text === undefined) {
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const progress = { ...local,
      cocktails:
        { ...local.cocktails, [id]: [...local.cocktails[id]] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
    return progress.cocktails[id];
  }
  if (document.URL.includes('comidas') && text !== undefined) {
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const progress = { ...local,
      meals:
            { ...local.meals,
              [id]: [...local.meals[id],
                text[1].innerText] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
    return progress.meals[id];
  }
  if (document.URL.includes('bebidas') && text !== undefined) {
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const progress = { ...local,
      cocktails:
            { ...local.cocktails,
              [id]: [...local.cocktails[id],
                text[1].innerText] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
    return progress.cocktails[id];
  }
}

export default progressRecipeStorage;
