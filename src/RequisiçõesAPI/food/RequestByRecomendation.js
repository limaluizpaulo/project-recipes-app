const fetchFoodsRecomendation = async () => {
  try {
    const API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const request = await fetch(API).then((response) => response.json());
    return request;
  } catch (error) {
    // console.log(error);
  }
};

export default fetchFoodsRecomendation;

// Source https://imasters.com.br/front-end/entenda-tudo-sobre-asyncawait
