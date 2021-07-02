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
