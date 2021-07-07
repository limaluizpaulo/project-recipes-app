export function initializeLocalStorage(email) {
  const initialData = [
    { key: 'mealsToken', keyValue: 1 },
    { key: 'cocktailsToken', keyValue: 1 },
    { key: 'user', keyValue: { email } },
    { key: 'doneRecipes', keyValue: [] },
    { key: 'favoriteRecipes', keyValue: [] },
    { key: 'inProgressRecipes', keyValue: { cocktails: {}, meals: {} } },
  ];

  initialData.forEach(({ key, keyValue }) => {
    const stringifyValue = JSON.stringify(keyValue);
    localStorage.setItem(key, stringifyValue);
  });
}

// Setar item no LocalStorage
export function setItemLocalStorage(key, value) {
  let result = value;

  if (key !== 'mealsToken' || key !== 'cocktailsToken') {
    result = JSON.stringify(value);
  }

  localStorage.setItem(key, result);
}

// Pegar item pro localStorage
export function getItemLocalStorage(key) {
  let result = localStorage.getItem(key);

  if (key !== 'mealsToken' || key !== 'cocktailsToken') {
    result = JSON.parse(result);
  }

  return result;
}
