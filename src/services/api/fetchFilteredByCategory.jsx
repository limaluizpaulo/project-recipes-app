const fetchFilteredByCategory = async (type, category) => {
  const search = (type === 'meals') ? 'meal' : 'cocktail';
  const MEALS_URL = `https://www.the${search}db.com/api/json/v1/1/filter.php?c=${category}`;
  const recipes = await fetch(MEALS_URL)
    .then((res) => res.json())
    .then((res) => res[type]);
  const resLength = 12;

  return recipes.filter((_, index) => index < resLength);
};

export default fetchFilteredByCategory;
