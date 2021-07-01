import { useEffect, useState } from 'react';

function RequestByCategory() {
  const urlRequestByCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  const [requestByCategoryState, setRequestByCategoryState] = useState([]);

  useEffect(() => {
    fetch(urlRequestByCategory)
      .then((r) => r.json())
      .then((p) => setRequestByCategoryState(p.meals))
      .catch((error) => error);
  }, []);

  console.log('Category:', requestByCategoryState);

  return requestByCategoryState;
}

export default RequestByCategory;
