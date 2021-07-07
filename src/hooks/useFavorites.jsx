export default function useFavorite() {
  const handleToggleFavorite = (fav, setFav, favoriteRecipes, recipe) => {
    const id = recipe.idMeal || recipe.idDrink;
    if (fav) {
      const item = favoriteRecipes.filter((elem) => elem.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(item));
    } else {
      const favRecipe = {
        id,
        type: recipe.idMeal ? 'comida' : 'bebida',
        area: recipe.strArea || '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic || '',
        name: recipe.strMeal || recipe.strDrink,
        image: recipe.strMealThumb || recipe.strDrinkThumb,
      };

      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, favRecipe]));
    }
    setFav(!fav);
  };
  return { handleToggleFavorite };
}
