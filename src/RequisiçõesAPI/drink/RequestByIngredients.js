const fetchIngredientsDrinks = async () => {
  try {
    const API = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const request = await fetch(API).then((response) => response.json());
    return request;
  } catch (error) {
    // console.log(error);
  }
};

export default fetchIngredientsDrinks;

// import { useEffect, useState } from 'react';

// function RequestByDrinksIngredients() {
//   const urlRequestByIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

//   const [requestByIngredientsState, setRequestByIngredientsState] = useState([]);

//   useEffect(() => {
//     fetch(urlRequestByIngredients)
//       .then((r) => r.json())
//       .then((p) => setRequestByIngredientsState(p.drinks))
//       .catch((error) => error);
//   }, []);

//   console.log('Ingredients:', requestByIngredientsState);

//   return requestByIngredientsState;
// }

// export default RequestByDrinksIngredients;
