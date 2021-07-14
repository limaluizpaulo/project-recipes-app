import { requestDrink,
  requestCategoryDrink,
  requesIngredientDrink } from './requests';

async function resolve(setDataDrink, setCategory, setLoading, ingredients) {
  const resolveDrinks = await requestDrink();
  const resolveCategory = await requestCategoryDrink();
  if (ingredients) {
    const resolveByIngredients = await requesIngredientDrink(ingredients);
    setDataDrink(resolveByIngredients);
  } else {
    setDataDrink(resolveDrinks);
  }
  setCategory(resolveCategory);
  setLoading(false);
}

export default resolve;
