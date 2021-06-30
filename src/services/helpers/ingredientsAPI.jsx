// const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;

const ingredientsAPI = async (type, search) => {
  const fetchAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${search}`);
  const ingredients = await fetchAPI.json();
  return (ingredients.meals);
};
console.log(ingredientsAPI());
export default ingredientsAPI;
