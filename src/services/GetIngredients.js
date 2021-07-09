function getIngredients(response) {
  const object = Object.entries(response);
  const list = [];
  const recipeIngredients = object.filter((entry) => (
    entry[0].match(/strIngredient/) && entry[1] !== '' && entry[1] !== null));
  const recipeQuantities = object.filter((entry) => (
    entry[0].match(/strMeasure/) && entry[1] !== ' ' && entry[1] !== null));
  for (let i = 0; i < recipeIngredients.length; i += 1) {
    list.push(
      ` ${recipeIngredients[i][1]} - ${recipeQuantities[i][1]}`,
    );
  }
  return list;
}

export default getIngredients;
