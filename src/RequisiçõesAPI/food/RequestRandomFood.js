const fetchRandomFood = async () => {
  try {
    const API = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const request = await fetch(API).then((response) => response.json());
    return request;
  } catch (error) {
    // console.log(error);
  }
};

export default fetchRandomFood;
