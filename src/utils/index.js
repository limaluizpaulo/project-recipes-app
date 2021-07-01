export const test = () => false;

export const endPoint = ({ inputSearch, option, food }) => {
  let query = '';
  let db = '';
  switch (option) {
  case 'ingredient':
    query = `filter.php?i=${inputSearch}`;
    break;
  case 'name':
    query = `search.php?s=${inputSearch}`;
    break;
  case 'firstLetter':
    query = `search.php?f=${inputSearch}`;
    break;
  default:
    return false;
  }
  db = food ? 'themealdb' : 'thecocktaildb';
  return `https://www.${db}.com/api/json/v1/1/${query}`;
};
