import React, { useContext } from 'react';
import { Redirect, Link, useLocation } from 'react-router-dom';

import RecipesContext from '../Context/RecipesContext';
import CategoryMeals from './CategoryMeals';

export default function CardMeal() {
  const { pathname } = useLocation();
  const { responseApiLupaMeal, redirect } = useContext(RecipesContext);
  let arrayMeal = responseApiLupaMeal;

  const twelve = 12;
  if (responseApiLupaMeal === null || !responseApiLupaMeal) {
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  if (responseApiLupaMeal.length > twelve) {
    arrayMeal = responseApiLupaMeal.filter((_e, index) => index < twelve);
  }

  if (responseApiLupaMeal.length === 1 && redirect) {
    const { idMeal } = responseApiLupaMeal[0];
    return <Redirect to={ `/comidas/${idMeal}` } />;
  }

  return (
    <main>
      { !pathname.includes('explorar') && <CategoryMeals />}
      <ul>
        {arrayMeal.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <Link to={ `/comidas/${idMeal}` } key={ index }>
            <li key={ idMeal } data-testid={ `${index}-recipe-card` }>
              <img
                width="80px"
                src={ strMealThumb }
                alt="imagem receita"
                data-testid={ `${index}-card-img` }
              />
              <div data-testid={ `${index}-card-name` }>{ strMeal }</div>
            </li>
          </Link>
        ))}
      </ul>
      {/*  // ) */}

    </main>
  );
}
