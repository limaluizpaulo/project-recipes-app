export default function onClickFavoriteIcon() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const {
    match: {
      params: { id },
    },
  } = this.props;
  const { detailsRecipe } = this.state;
  const newFavorite = {
    id,
    type: 'bebida',
    area: '',
    category: detailsRecipe[0].strCategory,
    alcoholicOrNot: detailsRecipe[0].strAlcoholic,
    name: detailsRecipe[0].strDrink,
    image: detailsRecipe[0].strDrinkThumb,
  };
  if (favoriteRecipes) {
    const isFavorite = favoriteRecipes.find((recipe) => recipe.id === id);
    if (isFavorite) {
      this.setState({
        isFavorite: false,
      });
      const newArray = favoriteRecipes.filter((recipe) => recipe.id !== id);
      return localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(newArray),
      );
    }
    this.setState({
      isFavorite: true,
    });
    const addFavorite = [...favoriteRecipes, newFavorite];
    return localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(addFavorite),
    );
  }
  this.setState({
    isFavorite: true,
  });
  return localStorage.setItem(
    'favoriteRecipes',
    JSON.stringify([newFavorite]),
  );
}
