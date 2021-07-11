const localStorageAction = async (newItem, action, actualArray) => {
  const findItem = actualArray.find((item) => item.id === newItem.id);
  switch (action) {
  case 'addOnce':
    if (findItem) {
      return actualArray;
    }
    return [...actualArray, newItem];

  case 'addToggle':
    console.log(findItem);
    if (findItem) {
      const filteredArray = actualArray.filter((item) => item.id !== newItem.id);
      console.log(filteredArray);
      return filteredArray;
    }
    console.log([...actualArray, newItem]);
    return [...actualArray, newItem];

  default:
    return actualArray;
  }
};

export default localStorageAction;
