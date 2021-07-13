export const doneRecipes = [
  {
    alcoholicOrNot: '',
    area: 'Turkish',
    category: 'Side',
    doneDate: '7/7/2021',
    id: '52978',
    image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
    name: 'Kumpir',
    tags: ['SideDish'],
    type: 'comida',
  },
  {
    alcoholicOrNot: 'Alcoholic',
    area: '',
    category: 'Milk / Float / Shake',
    doneDate: '7/7/2021',
    id: '14588',
    image: 'https://www.thecocktaildb.com/images/media/drink/rvwrvv1468877323.jpg',
    name: '151 Florida Bushwacker',
    tags: [],
    type: 'bebida',
  },
];

export function getDoneRecipes() {
  const recipes = doneRecipes;
  if (recipes) {
    return recipes;
  }
}

export function statusButton(target) {
  if (target === 'Food') {
    const foods = getDoneRecipes() ? (
      getDoneRecipes().filter((recipe) => recipe.type === 'comida')) : null;
    return foods;
  } if (target === 'Drink') {
    const drinks = getDoneRecipes() ? (
      getDoneRecipes().filter((recipe) => recipe.type === 'bebida')) : null;
    return drinks;
  }
  return getDoneRecipes();
}
