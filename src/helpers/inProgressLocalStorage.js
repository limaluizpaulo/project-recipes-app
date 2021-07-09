import ingredientList from './OLDingredientList';

function ternary(measure) {
  return !measure ? '' : measure;
}

export function inProgressLocalStorageDrinks(ingredients, id) {
  const list = ingredientList(ingredients)[0].map((ing, index) => (
    `${ing} - ${ternary(ingredientList(ingredients)[1][index])}`
  ));
  localStorage.setItem('inProgressRecipes', JSON.stringify(
    {
      ...JSON.parse(localStorage.getItem('inProgressRecipes')),
      cocktails: {
        [id]: list,
      },
    },
  ));
}

export function inProgressLocalStorageMeals(ingredients, id) {
  const list = ingredientList(ingredients)[0].map((ing, index) => (
    `${ing} - ${ingredientList(ingredients)[1][index]}`
  ));

  localStorage.setItem('inProgressRecipes', JSON.stringify(
    {
      ...JSON.parse(localStorage.getItem('inProgressRecipes')),
      meals: {
        [id]: list,
      },
    },
  ));
}
