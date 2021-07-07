export const setStorage = (key, value) => (
  localStorage.setItem(key, JSON.stringify(value)));

export const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

export const whatDayIsToday = () => {
  const todayIs = new Date();
  return `${todayIs.getDate()}/${todayIs.getMonth() + 1}/${todayIs.getFullYear()}`;
};

export const newDoneRecipe = (recipeDetail, foods) => {
  const r = recipeDetail; // só pra reduzir a verbosidade
  const maxTags = 2;
  const newDoneRecipE = {
    id: r.idMeal || r.idDrink,
    type: foods ? 'comida' : 'bebida',
    area: r.strArea || '',
    category: r.strCategory || '',
    alcoholicOrNot: r.strAlcoholic || '',
    name: r.strMeal || r.strDrink,
    image: r.strMealThumb || r.strDrinkThumb,
    doneDate: whatDayIsToday(),
    tags: r.strTags ? r.strTags.split(',').slice(0, maxTags) : [],
  };
  return newDoneRecipE;
};

export const infoFavorite = (recipeDetail, foods) => {
  const r = recipeDetail; // só pra reduzir a verbosidade
  const infoFav = {
    id: r.idMeal || r.idDrink,
    type: (foods) ? 'comida' : 'bebida',
    area: r.strArea || '',
    category: r.strCategory || '',
    alcoholicOrNot: r.strAlcoholic || '',
    name: r.strMeal || r.strDrink,
    image: r.strMealThumb || r.strDrinkThumb,
  };
  return infoFav;
};
