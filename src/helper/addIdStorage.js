function start(drink) {
  let idDrink;
  if (document.URL.includes('bebidas')) {
    idDrink = drink[0].idDrink;
  }
  if (document.URL.includes('comidas')) {
    idDrink = drink[0].idMeal;
  }
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (document.URL.includes('bebidas')) {
    inProgress.cocktails[`${idDrink}`] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }
  inProgress.meals[`${idDrink}`] = [];
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
}

export const request = async (requestByDetailsDrink,
  requestByDetailsMeal, startfunc, params) => {
  if (document.URL.includes('bebidas')) {
    const result = await requestByDetailsDrink(params.id);
    return startfunc(result.drinks);
  }
  const response = await requestByDetailsMeal(params.id);
  return startfunc(response.meals);
};

export const conditionRequest = async (requestByDetailsDrink,
  requestByDetailsMeal, startfunc, params) => {
  if (!localStorage.getItem('inProgressRecipes')) {
    await request(requestByDetailsDrink, requestByDetailsMeal, startfunc, params);
  }
};

export default start;
