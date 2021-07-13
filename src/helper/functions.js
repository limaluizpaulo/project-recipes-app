function progress({ objectStart, leng, typeRecipe, idRecipe, history, list }) {
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
  console.log(list);
  return typeRecipe === 'food'
    ? history.push({ pathname: `/comidas/${idRecipe}/in-progress`, recipe: list })
    : history.push({ pathname: `/bebidas/${idRecipe}/in-progress`, recipe: list });
}

export function copyLink(copy, setShow, location) {
  copy(`http://localhost:3000${location.pathname}`);
  setShow(true);
}

function alcoholicCheck(list) {
  return list.strAlcoholic === 'Alcoholic' ? 'Alcoholic' : 'Non Alcoholic';
}

export function help(value, secondValue) {
  // console.log(secondValue);
  return value !== null ? value : secondValue;
}

export function favoriteClick({
  arrayFavorite, list, favorite, typeRecipe, idRecipe, setFavorite }) {
  if (favorite) {
    setFavorite(false);
    const filt = arrayFavorite.filter((item) => item.id !== idRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filt));
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
