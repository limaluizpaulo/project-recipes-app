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

export function copyLink(copy, setShow, location) {
  copy(`http://localhost:3000${location.pathname}`);
  setShow(true);
}

function alcoholicCheck(list) {
  return list.strAlcoholic === 'Alcoholic' ? 'Alcoholic' : 'Non Alcoholic';
}

export function help(value, secondValue) {
  console.log(secondValue);
  return value !== null ? value : secondValue;
}

export function favoriteClick({
  arrayFavorite, list, favorite, typeRecipe, idRecipe, setFavorite }) {
  if (favorite) {
    setFavorite(false);
  } else {
    setFavorite(true);
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [...arrayFavorite,
        {
          id: idRecipe,
          type: typeRecipe === 'food' ? 'comida' : 'bebida',
          area: typeRecipe === 'food' ? list.strArea : '',
          category: list.strCategory,
          alcoholicOrNot: typeRecipe === 'food' ? '' : (alcoholicCheck(list)),
          name: typeRecipe === 'food' ? list.strMeal : list.strDrink,
          image: typeRecipe === 'food' ? list.strMealThumb : list.strDrinkThumb,
        }],
    ));
  }
}

export default progress;
