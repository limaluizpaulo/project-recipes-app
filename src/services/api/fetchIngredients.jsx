const fetchIngredients = async (type = 'meals') => {
  let search;
  let ingredient;
  if (type === 'meals') {
    search = 'meal';
    ingredient = 'strIngredient';
  } else {
    search = 'cocktail';
    ingredient = 'strIngredient1';
  }
  const MEALS_URL = `https://www.the${search}db.com/api/json/v1/1/list.php?i=list`;
  const res = await fetch(MEALS_URL);
  const res1 = await res.json();
  const res2 = res1[type];
  const resLength = 12;

  return res2
    .filter((_, index) => index < resLength)
    .map((ingredientType) => ingredientType[ingredient]);
};

export default fetchIngredients;
