import { useEffect, useState } from 'react';

function RequestByIngredients() {
  const urlRequestByIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

  const [requestByIngredientsState, setRequestByIngredientsState] = useState([]);

  useEffect(() => {
    fetch(urlRequestByIngredients)
      .then((r) => r.json())
      .then((p) => setRequestByIngredientsState(p.meals))
      .catch((error) => error);
  }, []);

  console.log('Ingredients:', requestByIngredientsState);

  return requestByIngredientsState;
}

export default RequestByIngredients;
