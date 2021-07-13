const fetchRecipeByDetails = async (idDetail) => {
  try {
    const API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDetail}`;
    const request = await fetch(API).then((response) => response.json());
    return request;
  } catch (error) {
    // console.log(error);
  }
};

export default fetchRecipeByDetails;
