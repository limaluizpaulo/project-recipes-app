export default function ingredientsAndMeasures(receita) {
  const arrayIngredients = [];
  const arrayMeasures = [];
  const arrayIngredientsAndMeasures = [];
  const arrayReceita = Object.entries(receita);

  if (arrayReceita) {
    arrayReceita.forEach(([key, value]) => {
      if (key.includes('strIngredient') && value) {
        arrayIngredients.push(value);
      }
    });
    arrayReceita.forEach(([key, value]) => {
      if (key.includes('strMeasure') && value) {
        arrayMeasures.push(value);
      }
    });
    for (let i = 0; i < arrayMeasures.length; i += 1) {
      arrayIngredientsAndMeasures.push({
        ingredient: arrayIngredients[i],
        quantidade: arrayMeasures[i],
        checked: false,
      });
    }
  }
  return arrayIngredientsAndMeasures;
}
