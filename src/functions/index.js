import React from 'react';

export const setStorage = (key, value) => (
  localStorage.setItem(key, JSON.stringify(value)));

export const getStorage = (key, value = []) => (
  JSON.parse(localStorage.getItem(key)) || value);

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

export const handleClickType = (type, key, setState) => {
  const translate = (type === 'Food') ? 'comida' : 'bebida';
  const storageRecipes = getStorage(key);
  const foodsOrDrinks = storageRecipes.filter((recipe) => recipe.type === translate);
  setState(foodsOrDrinks);
};

export const mealInfo = (index, area, category) => (
  <p
    className="doneCategory"
    data-testid={ `${index}-horizontal-top-text` }
  >
    {`${area} - ${category}`}
  </p>
);

export const drinkInfo = (index, alcoholicOrNot) => (
  <p
    className="doneCategory"
    data-testid={ `${index}-horizontal-top-text` }
  >
    {`${alcoholicOrNot}`}
  </p>
);
