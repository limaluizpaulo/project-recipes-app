export function saveUserEmail(user) {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserEmail() {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
}

function objFavoritMeal({ idMeal, strArea, strCategory, strMeal, strMealThumb }) {
  return [{ id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  }];
}

function objfavoritDrink({ idDrink, strCategory, strDrink, strMealThumb, strAlcoholic }) {
  return [{ id: idDrink,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strMealThumb,
  }];
}

export function saveFavoritRecipes(content, path, favoritStatus) {
  const type = path.includes('comidas') ? 'comida' : 'bebida';
  const FAVORIT_MEAL = type && favoritStatus;
  const FAVORIT_DRINK = type && favoritStatus;
  const DESFAVORIT_MEAL = type && !favoritStatus;
  const DESFAVORIT_DRINK = type && !favoritStatus;
  if (localStorage.getItem('favoriteRecipes')) {
    const arrayFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

    switch (true) {
    case FAVORIT_MEAL:
      return localStorage
        .setItem('favoriteRecipes',
          JSON.stringify(arrayFavorites.concat(objFavoritMeal(content))));
    case FAVORIT_DRINK:
      return localStorage
        .setItem('favoriteRecipes',
          JSON.stringify(arrayFavorites.concat(objfavoritDrink(content))));

    case DESFAVORIT_MEAL:
      // return localStorage
      //   .setItem('favoriteRecipes',
      //     JSON.stringify(arrayFavorites.filter((el) => el)));
      break;

    case DESFAVORIT_DRINK:
      // return localStorage
      //   .setItem('favoriteRecipes',
      //     JSON.stringify(arrayFavorites.filter((el) => el)));
      break;

    default:
      return localStorage
        .setItem('favoriteRecipes', JSON.stringify(arrayFavorites));
    }
  }
}

export const saveFavoriteRecipe = (path, obj) => {
  const [id, name, image, type, area, alcoholicOrNot] = path.includes('comidas')
    ? [obj.idMeal, obj.strMeal, obj.strMealThumb, 'comida', obj.strArea, '']
    : [obj.idDrink, obj.strDrink, obj.strDrinkThumb, 'bebida', '', obj.strAlcoholic];
  const category = obj.strCategory;
  if (localStorage.getItem('favoriteRecipes')) {
    const arrayFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!arrayFavorites.find((el) => el.id === id)) {
      console.log('entrei no push');
      arrayFavorites.push({ id,
        type,
        area,
        category,
        alcoholicOrNot,
        name,
        image,
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavorites));
    } else {
      console.log('entrei no filter');
      console.log(arrayFavorites);
      arrayFavorites.filter((ele) => console.log(id) || ele.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavorites));
    }
    // localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavorites));
  } else {
    console.log('Criei chave no localStorage');

    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [{ id,
        type,
        area,
        category,
        alcoholicOrNot,
        name,
        image,
      }],
    ));
  }
};

function defaultDoneDrinkObj(recipe, date) {
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

function defaultDoneMealObj(recipe, date) {
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
  const type = path.includes('comidas') ? 'comida' : 'bebida';

  if (localStorage.getItem('doneRecipes')) {
    const arrayOfDone = JSON.parse(localStorage.getItem('doneRecipes'));
    switch (type) {
    case 'comida':
      return localStorage
        .setItem('doneRecipes',
          JSON.stringify(arrayOfDone.concat(defaultDoneMealObj(recipe, date))));
    case 'bebida':
      return localStorage
        .setItem('doneRecipes',
          JSON.stringify(arrayOfDone.concat(defaultDoneDrinkObj(recipe, date))));
    default:
      return localStorage
        .setItem('doneRecipes', JSON.stringify(arrayOfDone));
    }
  } else {
    switch (type) {
    case 'comida':
      return localStorage
        .setItem('doneRecipes', JSON.stringify(defaultDoneMealObj(recipe, date)));
    case 'bebida':
      return localStorage
        .setItem('doneRecipes', JSON.stringify(defaultDoneDrinkObj(recipe, date)));
    default:
      return localStorage.setItem('doneRecipes', JSON.stringify([{}]));
    }
  }
}
