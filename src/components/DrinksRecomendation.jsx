import React, { useEffect, useState } from 'react';
import fetchDrinksRecomendation from '../RequisiçõesAPI/drink/RequestByRecomendation';

export default function DrinksRecomendation() {
  const [recomend, setRecomend] = useState([]);

  useEffect(() => {
    const handleDrinksRecomendation = async () => {
      const zero = 0;
      const six = 6;
      const response = await fetchDrinksRecomendation();
      const result = await response.drinks;
      const sixRecomend = result.slice(zero, six);
      setRecomend(sixRecomend);
      console.log(recomend);
    };
    handleDrinksRecomendation();
  }, []);

  return (

    <div>
      { recomend.map((drink, index) => (
        <div
          data-testid={ `${index}-recomendation-card` }
          key={ index }
        >
          <p
            data-testid={ `${index}-recomendation-title` }
          >
            {drink.strDrink}
          </p>
          <button
            type="button"
            key={ index }
          // onClick={ () => history.push('/bebidas') }
          >
            <img
              key={ index }
              data-testid={ `${index}-card-img` }
              alt={ drink.strDrink }
              src={ drink.strDrinkThumb }
            />
          </button>
        </div>
      ))}
    </div>

  );
}
