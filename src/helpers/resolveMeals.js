import requestMeal, {
  requestCategoryMeal,
  requesIngredientsmeal } from './requests';

async function resolve(setDataFood, setCategory, setLoading, ingredients) {
  const resolveMeal = await requestMeal();
  const resolveCategory = await requestCategoryMeal();
  if (ingredients) {
    const resolveByIngredients = await requesIngredientsmeal(ingredients);
    setDataFood(resolveByIngredients);
  } else {
    setDataFood(resolveMeal);
  }
  setCategory(resolveCategory);
  setLoading(false);
}

export default resolve;
