function progressRecipeStorage(elements, text) {
  const local = localStorage.getItem('inProgressRecipes') ? (
    JSON.parse(localStorage.getItem('inProgressRecipes'))) : { cocktails: {}, meals: {} };

  if (document.URL.includes('comidas')) {
    const progress = { ...local,
      meals:
        { ...local.meals, [elements]: [text[1].innerText] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  }
  if (document.URL.includes('bebidas')) {
    const progress = { ...local,
      cocktails:
        { ...local.cocktails, [elements]: [text[1].innerText] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  }
}

export default progressRecipeStorage;
