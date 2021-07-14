function progressRecipeStorage(text, id) {
  const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (document.URL.includes('comidas')) {
    const progress = { ...local,
      meals:
        { ...local.meals, [id]: [...local.meals[id], text[1].innerText] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  }
  if (document.URL.includes('bebidas')) {
    const progress = { ...local,
      cocktails:
        { ...local.cocktails, [id]: [...local.cocktails[id], text[1].innerText] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  }
}

export default progressRecipeStorage;
