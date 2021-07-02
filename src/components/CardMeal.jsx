import React, { useContext } from 'react';

import RecipesContext from '../Context/RecipesContext';

export default function CardMeal() {
  const { responseApiLupaMeal } = useContext(RecipesContext);
  let arrayMeal = responseApiLupaMeal;
  const twelve = 12;
  if (responseApiLupaMeal.length > twelve) {
    arrayMeal = responseApiLupaMeal.filter((_e, index) => index < twelve);
  }

  return (
    <main>
      <ul>
        {arrayMeal.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <li key={ idMeal } data-testid={ `${index}-recipe-card` }>
            <img
              width="80px"
              src={ strMealThumb }
              alt="imagem receita"
              data-testid={ `${index}-card-img` }
            />
            <div data-testid={ `${index}-card-name` }>{ strMeal }</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
