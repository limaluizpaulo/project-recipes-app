import { capitalize } from 'lodash-es';

export const pathTreament = (pathname) => {
  const negativeOne = -1;
  const lastLetter = pathname.slice(negativeOne);
  let newPathname = pathname;
  // console.log('oi');
  if (lastLetter === '/') {
    const size = pathname.length - 1;
    newPathname = (pathname.slice(0, size));
  }
  if (newPathname.includes('comidas/')) {
    return '/bebidas';
  }
  if (newPathname.includes('bebidas/')) {
    return '/comidas';
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

export const createDoneRecipe = (id, type, detailsData) => {
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
    doneDate: 'quando - a - receita - foi - concluida',
    tags: detailsData.strTags || [],
  };
  return item;
};
