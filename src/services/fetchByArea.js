const fetchByArea = async () => {
  try {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const request = await fetch(endpoint);
    const promise = await request.json();
    return promise.meals;
  } catch (error) {
    console.log(error);
  }
};

export default fetchByArea;
