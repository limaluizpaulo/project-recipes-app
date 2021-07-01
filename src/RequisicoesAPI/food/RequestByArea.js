import { useEffect, useState } from 'react';

function RequestByArea() {
  const urlRequestByArea = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

  const [requestByAreaState, setRequestByAreaState] = useState([]);

  useEffect(() => {
    fetch(urlRequestByArea)
      .then((r) => r.json())
      .then((p) => setRequestByAreaState(p.meals))
      .catch((error) => error);
  }, []);

  console.log('Area:', requestByAreaState);

  return requestByAreaState;
}

export default RequestByArea;
