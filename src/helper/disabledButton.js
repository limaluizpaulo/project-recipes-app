const conditionMeal = (page, params, array, setActive) => {
  if (array.length !== page.meals[params.id].length) {
    return setActive(true);
  }
  setActive(false);
};

const conditionDrink = (page, params, array, setActive) => {
  if (array.length !== page.cocktails[params.id].length) {
    return setActive(true);
  }
  setActive(false);
};

function useConditionItems(page, params, array, setActive) {
  if (document.URL.includes('comidas')) {
    conditionMeal(page, params, array, setActive);
  }
  if (document.URL.includes('bebidas')) {
    conditionDrink(page, params, array, setActive);
  }
}

export default useConditionItems;
