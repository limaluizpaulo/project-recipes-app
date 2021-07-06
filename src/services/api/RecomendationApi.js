const RecomendationApi = async (type) => {
  const search = (type === 'meals') ? 'cocktail' : 'meals';
  const endpoint = `(https://www.the${search}db.com/api/json/v1/1/search.php?s=)`;
  const response = await fetch(endpoint);
  const result = await response.json();
  console.log(result);
  return result;
};

export default RecomendationApi;
