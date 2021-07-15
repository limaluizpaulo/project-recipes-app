import { capitalize } from 'lodash-es';

export const pathTreament = (pathname, change = false) => {
  const negativeOne = -1;
  const lastLetter = pathname.slice(negativeOne);
  let newPathname = pathname;
  if (lastLetter === '/') {
    const size = pathname.length - 1;
    newPathname = (pathname.slice(0, size));
  }
  if (change) {
    if (newPathname.includes('comidas')) {
      return '/bebidas';
    }
    if (newPathname.includes('bebidas')) {
      return '/comidas';
    }
  }
  if (newPathname.includes('explorar')) {
    return newPathname.includes('comida') ? '/comidas' : '/bebidas';
    //  código alternativo(split): https://www.w3schools.com/jsref/jsref_split.asp
  }
  return newPathname;
};

export const alertMessage = (fn, message) => {
  fn(message);
};

export const getItem = (key) => JSON.parse(localStorage.getItem(key));
export const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const setInitialItem = (key, value) => {
  if (!getItem(key)) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const createDoneRecipe = (id, type, detailsData, pathname) => {
  const minusOne = -1;
  const singleType = capitalize(type.slice(0, minusOne));
  const thumbnail = `str${singleType}Thumb`;
  const title = `str${singleType}`;

  const item = {
    id,
    type: (type === 'meals') ? 'comida' : 'bebida',
    area: detailsData.strArea || '',
    category: detailsData.strCategory || '',
    alcoholicOrNot: detailsData.strAlcoholic || '',
    name: detailsData[title],
    image: detailsData[thumbnail],
    doneDate: new Date(),
    tags: detailsData.strTags || [],
    url: pathname,
  };
  return item;
};

export const createIngredientList = (detailsData) => {
  if (detailsData) {
    return (Object.keys(detailsData).filter(
      (key) => (key.includes('strIngredient') && detailsData[key]),
    ));
  }
  return [];
};
