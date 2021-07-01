export const setOnLocalStorage = (key, value) => {
  let itemToBeStored = value;
  if (typeof value === 'object') itemToBeStored = JSON.stringify(value);
  localStorage.setItem(key, itemToBeStored);
};

export const getFromLocalStorage = (key) => {
  const resFromLocalStorage = localStorage.getItem(key);
  return JSON.parse(resFromLocalStorage);
};
