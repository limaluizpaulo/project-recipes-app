import { useEffect, useState } from 'react';

function RequestRandomDrink() {
  const urlRandomDrink = 'www.thecocktaildb.com/api/json/v1/1/random.php';

  const [randomDrink, setRandomDrink] = useState([]);

  useEffect(() => {
    fetch(urlRandomDrink)
      .then((r) => r.json())
      .then((p) => setRandomDrink(p))
      .catch((error) => error);
  }, []);

  console.log('Random Drink:', randomDrink);

  return randomDrink;
}

export default RequestRandomDrink;
