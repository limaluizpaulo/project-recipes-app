function progress({ objectStart, leng, typeRecipe, idRecipe, history }) {
  if (typeRecipe !== 'food') {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {
        ...objectStart.cocktails,
        [idRecipe]: [...leng],
      },
      meals: {
        ...objectStart.meals,
      },
    }));
  }

  if (typeRecipe === 'food') {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {
        ...objectStart.cocktails,
      },
      meals: {
        ...objectStart.meals,
        [idRecipe]: [...leng],
      },
    }));
  }

  return typeRecipe === 'food' ? history.push(`/comidas/${idRecipe}/in-progress`)
    : history.push(`/bebidas/${idRecipe}/in-progress`);
}

export default progress;
