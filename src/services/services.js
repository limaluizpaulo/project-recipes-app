export default (array1, array2) => {
  const list = array1.length ? array1 : array2;
  const arrayCopy = [...list];
  const twelveItems = 12;
  const finalList = arrayCopy.splice(0, twelveItems);
  return finalList;
};
