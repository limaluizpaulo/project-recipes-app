// import { useEffect, useState } from 'react';

// function RequestByIngredients() {
//   const urlRequestByIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

//   const [requestByIngredientsState, setRequestByIngredientsState] = useState([]);

//   useEffect(() => {
//     fetch(urlRequestByIngredients)
//       .then((r) => r.json())
//       .then((p) => setRequestByIngredientsState(p.meals))
//       .catch((error) => error);
//   }, []);

//   console.log('Ingredients:', requestByIngredientsState);

//   return requestByIngredientsState;
// }

// export default RequestByIngredients;

const fetchIngredientsFood = async () => {
  try {
    const API = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const request = await fetch(API).then((response) => response.json());
    return request;
  } catch (error) {
    // console.log(error);
  }
};

export default fetchIngredientsFood;
