const copy = require('clipboard-copy');
// const month
// const year

export const copyLink = ({ url }) => {
  copy(`http://localhost:3000${url}`);
  return true;
};

export const copyLinkInProgress = ({ url }) => {
  const splittedURL = url.split('/');
  const urlNoProgress = `/${splittedURL[1]}/${splittedURL[2]}`;
  copy(`http://localhost:3000${urlNoProgress}`);
  return true;
};

export const verifyCheck = (index, check) => {
  if (check) {
    return check[index];
  }
  return false;
};

export const generateCorrectObj = (details) => {
  let newFinishedRecipe;
  const date = new Date();
  console.log(date.getDay());
  if (details[0].idMeal) {
    newFinishedRecipe = {
      id: details[0].idMeal,
      type: 'comida',
      area: details[0].strArea,
      category: details[0].strCategory,
      alcoholicOrNot: '',
      name: details[0].strMeal,
      image: details[0].strMealThumb,
      doneDate: 'dont know yet',
      tags: details[0].strTags ? details[0].strTags.split(',') : [],
    };
  } else {
    newFinishedRecipe = {
      id: details[0].idDrink,
      type: 'bebida',
      area: '',
      category: details[0].strCategory,
      alcoholicOrNot: details[0].strAlcoholic,
      name: details[0].strDrink,
      image: details[0].strMealDrink,
      doneDate: 'dont/know/yet',
      tags: [],
    };
  }
  return newFinishedRecipe;
};
