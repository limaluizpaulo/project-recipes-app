export default function ingredientList(recipe) {
  const list = [];

  list.push(Object.entries(recipe[0])
    .filter((ingredient) => (
      ingredient[0].includes('strIngredient')
    ))
    .filter((nullConditional) => (
      nullConditional[1] !== null
    ))
    .map((setIngredients) => (
      setIngredients[1].length > 0 && setIngredients[1]
    ))
    .filter((finalList) => finalList !== false));

  list.push(Object.entries(recipe[0])
    .filter((ingredient) => (
      ingredient[0].includes('strMeasure')
    ))
    .filter((nullConditional) => (
      nullConditional[1] !== null
    ))
    .map((setIngredients) => (
      setIngredients[1].length !== ' ' && setIngredients[1]
    ))
    .filter((finalList) => finalList !== false));

  return list;
}
