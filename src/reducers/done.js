const INITIAL_STATE = {
  allDone: [
    {
      idMeal: '52771',
      type: 'comida',
      strArea: 'Italian',
      strCategory: 'Vegetarian',
      alcoholicOrNot: '',
      strMeal: 'Spicy Arrabiata Penne',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      strTags: 'Pasta,Curry',
    },
    {
      idDrink: '178319',
      type: 'bebida',
      strArea: '',
      strCategory: 'Cocktail',
      strAlcoholic: 'Alcoholic',
      strDrink: 'Aquamarine',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ],
};

function done(state = INITIAL_STATE, { type }) {
  switch (type) {
  case 'FINISHED':
    return ({
      ...state,
      allDone: type.value,
    });
  default:
    return state;
  }
}

export default done;
