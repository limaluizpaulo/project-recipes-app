function saveWithFavorites(params) {
  const {
    url,
    food,
    recipe,
    setFavorite,
  } = params;

  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(params);
  if (url.match(food)) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, {
      id: recipe.idMeal,
      type: recipe.strCategory,
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: null,
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: null,
      tags: recipe.strTags,
    }]));
    setFavorite(true);
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, {
      id: recipe.idDrink,
      type: recipe.strCategory,
      area: null,
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: null,
      tags: recipe.strTags,
    }]));
    setFavorite(true);
  }
}

export default saveWithFavorites;
