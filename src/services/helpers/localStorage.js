export const setOnLocalStorage = (key, value) => {
  let itemToBeStored = value;
  if (typeof value === 'object') itemToBeStored = JSON.stringify(value);
  localStorage.setItem(key, itemToBeStored);
};

export const getFromLocalStorage = (key) => {
  const resFromLocalStorage = localStorage.getItem(key);
  return JSON.parse(resFromLocalStorage);
};

export const updateLocalStorage = (key, value, array = false) => {
  const itemStored = getFromLocalStorage(key);
  if (!itemStored) {
    if (array) {
      setOnLocalStorage(key, [value]);
      return;
    }
    setOnLocalStorage(key, value);
  } else if (Array.isArray(itemStored)) {
    console.log(itemStored);
    itemStored.push(value);
    setOnLocalStorage(key, itemStored);
  } else {
    setOnLocalStorage(key, value);
  }
};

export const removeFromLocalStorage = (key, value) => {
  const itemStored = getFromLocalStorage(key);
  const newItemsToBeStored = itemStored.filter(({ id }) => id !== value.id);
  setOnLocalStorage(key, newItemsToBeStored);
};

export const setRecipeInProgressLocalStorage = (type, id) => {
  const key = 'inProgressRecipes';
  const itensStored = getFromLocalStorage(key);
  if (!itensStored || !itensStored[type]) {
    const obj = { ...itensStored,
      [type]: {
        [id]: [],
      },
    };
    setOnLocalStorage(key, obj);
  } else {
    itensStored[type][id] = [];
    setOnLocalStorage(key, itensStored);
  }
};

// função provisória para desenvolvimento da tela de receitas feitas
export const getRecipesDone = () => {
  const test = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    }];
  localStorage.setItem('doneRecipes', JSON.stringify(test));
  const doneRecipesReceived = localStorage.getItem('doneRecipes');
  const doneRecipesParsed = JSON.parse(doneRecipesReceived);
  return doneRecipesParsed;
};
