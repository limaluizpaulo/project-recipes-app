import { useEffect, useState } from 'react';

function RequestDrinkImg() {
  const urlRequestImgDrink = 'www.thecocktaildb.com/images/ingredients/gin-Small.png';

  const [requestDrinkImg, setRequestDrinkImg] = useState([]);

  useEffect(() => {
    fetch(urlRequestImgDrink)
      .then((r) => r.json())
      .then((p) => setRequestDrinkImg(p.meals))
      .catch((error) => error);
  }, []);

  console.log('Drink Img:', requestDrinkImg);

  return requestDrinkImg;
}

export default RequestDrinkImg;
