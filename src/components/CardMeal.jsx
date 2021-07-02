import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import RecipesContext from '../Context/RecipesContext';

export default function CardMeal() {
  const { responseApiLupaMeal } = useContext(RecipesContext);
  const history = useHistory();
  let arrayMeal = responseApiLupaMeal;

  const twelve = 12;
  if (responseApiLupaMeal === null || !responseApiLupaMeal) {
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  if (responseApiLupaMeal.length > twelve) {
    arrayMeal = responseApiLupaMeal.filter((_e, index) => index < twelve);
  }

  if (responseApiLupaMeal.length === 1) {
    const { idMeal } = responseApiLupaMeal[0];
    return history.push(`/comidas/${idMeal}`);
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
