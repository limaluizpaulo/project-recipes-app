// data[dictionaryFood.Id]
const dictionaryFood = {
  Id: 'idMeal',
  Name: 'strMeal',
  DrinkAlternate: 'strDrinkAlternate',
  Category: 'strCategory',
  Area: 'strArea',
  MealThumb: 'strMealThumb',
  Tags: 'strTags',
  Youtube: 'strYoutube',
  Source: 'strSource',
  ImageSource: 'strImageSource',
  CreativeCommonsConfirmed: 'strCreativeCommonsConfirmed',
  dateModified: 'dateModified',
  Instructions: 'strInstructions',
  Ingredients: [
    ['strIngredient1', 'strMeasure1'],
    ['strIngredient2', 'strMeasure2'],
    ['strIngredient3', 'strMeasure3'],
    ['strIngredient4', 'strMeasure4'],
    ['strIngredient5', 'strMeasure5'],
    ['strIngredient6', 'strMeasure6'],
    ['strIngredient7', 'strMeasure7'],
    ['strIngredient8', 'strMeasure8'],
    ['strIngredient9', 'strMeasure9'],
    ['strIngredient10', 'strMeasure10'],
    ['strIngredient11', 'strMeasure11'],
    ['strIngredient12', 'strMeasure12'],
    ['strIngredient13', 'strMeasure13'],
    ['strIngredient14', 'strMeasure14'],
    ['strIngredient15', 'strMeasure15'],
    ['strIngredient16', 'strMeasure16'],
    ['strIngredient17', 'strMeasure17'],
    ['strIngredient18', 'strMeasure18'],
    ['strIngredient19', 'strMeasure19'],
    ['strIngredient20', 'strMeasure20'],
  ],
};

const dictionaryDrink = {
  Id: 'idDrink',
  Name: 'strDrink',
  DrinkAlternate: 'strDrinkAlternate',
  Tags: 'strTags',
  Youtube: 'strVideo',
  Category: 'strCategory',
  IBA: 'strIBA',
  Alcoholic: 'strAlcoholic',
  Glass: 'strGlass',
  Instructions: 'strInstructions',
  InstructionsES: 'strInstructionsES',
  InstructionsDE: 'strInstructionsDE',
  InstructionsFR: 'strInstructionsFR',
  InstructionsIT: 'strInstructionsIT',
  InstructionsZH_HANS: 'strInstructionsZH-HANS',
  InstructionsZH_HANT: 'strInstructionsZH-HANT',
  DrinkThumb: 'strDrinkThumb',
  Ingredients: [
    ['strIngredient1', 'strMeasure1'],
    ['strIngredient2', 'strMeasure2'],
    ['strIngredient3', 'strMeasure3'],
    ['strIngredient4', 'strMeasure4'],
    ['strIngredient5', 'strMeasure5'],
    ['strIngredient6', 'strMeasure6'],
    ['strIngredient7', 'strMeasure7'],
    ['strIngredient8', 'strMeasure8'],
    ['strIngredient9', 'strMeasure9'],
    ['strIngredient10', 'strMeasure10'],
    ['strIngredient11', 'strMeasure11'],
    ['strIngredient12', 'strMeasure12'],
    ['strIngredient13', 'strMeasure13'],
    ['strIngredient14', 'strMeasure14'],
    ['strIngredient15', 'strMeasure15'],
  ],
  ImageSource: 'strImageSource',
  ImageAttribution: 'strImageAttribution',
  CreativeCommonsConfirmed: 'strCreativeCommonsConfirmed',
  dateModified: 'dateModified',
};

function identification(obj) {
  if (obj.idMeal) {
    return dictionaryFood;
  }
  return dictionaryDrink;
}

export default identification;
