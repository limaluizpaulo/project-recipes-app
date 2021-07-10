export function saveUserEmail(user) {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserEmail() {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
}

export const saveFavoriteRecipe = (id, path, content) => (title, img) => {
  if (localStorage.getItem('favoriteRecipes')) {
    const arrayFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(arrayFavorites);
    arrayFavorites.push({ id,
      type: path.includes('bebidas') ? 'bebida' : 'comida',
      area: path.includes('bebidas') ? '' : content.strArea,
      category: content.strCategory,
      alcoholicOrNot: path.includes('bebidas') ? content.strAlcoholic : '',
      name: content[title],
      image: content[img],
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavorites));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [{ id,
        type: path.includes('bebidas') ? 'bebida' : 'comida',
        area: path.includes('bebidas') ? '' : content.strArea,
        category: content.strCategory,
        alcoholicOrNot: path.includes('bebidas') ? content.strAlcoholic : '',
        name: content[title],
        image: content[img],
      }],
    ));
  }
};

function formatedDrinkObj(recipe, date) {
  const { idDrink, strDrink, strCategory, strAlcoholic, strTags, strDrinkThumb } = recipe;
  return [{
    id: idDrink,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
    doneDate: date,
    tags: strTags || '',
  }];
}

function formatedMealObj(recipe, date) {
  const { idMeal, strMeal, strCategory, strArea, strTags, strMealThumb } = recipe;
  return [{
    id: idMeal,
    type: 'comida',
    area: strArea || '',
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
    doneDate: date,
    tags: strTags || '',
  }];
}

export function saveFinished(recipe, path, date) {
  const type = path.includes('comida') ? 'comida' : 'bebida';

  if (localStorage.getItem('doneRecipes')) {
    const arrayOfDone = JSON.parse(localStorage.getItem('doneRecipes'));
    switch (type) {
    case 'comida':
      return localStorage
        .setItem('doneRecipes',
          JSON.stringify(arrayOfDone.concat(formatedMealObj(recipe, date))));
    case 'bebida':
      return localStorage
        .setItem('doneRecipes',
          JSON.stringify(arrayOfDone.concat(formatedDrinkObj(recipe, date))));
    default:
      return localStorage
        .setItem('doneRecipes', JSON.stringify(arrayOfDone));
    }
  } else {
    switch (type) {
    case 'comida':
      return localStorage
        .setItem('doneRecipes', JSON.stringify(formatedMealObj(recipe, date)));
    case 'bebida':
      return localStorage
        .setItem('doneRecipes', JSON.stringify(formatedDrinkObj(recipe, date)));
    default:
      return localStorage.setItem('doneRecipes', JSON.stringify([{}]));
    }
  }
}
