const fetchById = async (type = 'meals', id) => {
  const search = (type === 'meals') ? 'meal' : 'cocktail';
  const url = `https://www.the${search}db.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const result = await response.json();
  return result[type][0];
};
export default fetchById;
