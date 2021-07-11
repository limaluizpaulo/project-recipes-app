const localStorageAction = async (newItem, action, actualArray) => {
  switch (action) {
    case 'addOnce':
      const findItem = actualArray.find((item) => item.id === newItem.id);

      if (findItem) {
        return actualArray;
      } else {
        return [...actualArray, newItem];
      }
    
    case 'addToogle':
      const filteredArray = actualArray.find((item) => item.id !== newItem.id);
      return filteredArray;
  
    default:
      return actualArray;
  }
}

export default localStorageAction;