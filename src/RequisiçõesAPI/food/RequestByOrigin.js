const fetchOriginFood = async () => {
  try {
    const API = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const request = await fetch(API).then((response) => response.json());
    return request;
  } catch (error) {
    // console.log(error);
  }
};

export default fetchOriginFood;
