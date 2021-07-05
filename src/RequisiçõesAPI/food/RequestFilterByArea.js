const fetchFilterByArea = async (foodOptionSelected) => {
  try {
    const API = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${foodOptionSelected}`;
    const request = await fetch(API).then((response) => response.json());
    return request;
  } catch (error) {
    // console.log(error);
  }
};

export default fetchFilterByArea;
