export default function formatIngredientsAndMeasuresArray(recipe) {
  const recipeProps = Object.keys(recipe);
  const ingredients = [];
  const measures = [];
  const formatedArray = [];
  recipeProps.forEach((prop) => {
    if (prop.match(/strIngredient\d+/) && recipe[prop]) {
      ingredients.push(recipe[prop]);
    }

    if (prop.match(/strMeasure\d+/) && recipe[prop]) {
      measures.push(recipe[prop]);
    }
  });
  ingredients.forEach((ingredient, index) => {
    formatedArray.push([ingredient, measures[index]]);
  });
  return formatedArray;
}
