import React, { useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';

import RecipesContext from '../Context/RecipesContext';

import CategoryDrinks from './CategoryDrinks';

export default function CardDrink() {
  const { resposeApiLupaDrink, redirect } = useContext(RecipesContext);
  const twelve = 12;
  let arrayDrink = resposeApiLupaDrink;

  if (resposeApiLupaDrink === null || resposeApiLupaDrink === undefined) {
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  if (resposeApiLupaDrink.length > twelve) {
    arrayDrink = resposeApiLupaDrink.filter((_e, index) => index < twelve);
  }
  if (resposeApiLupaDrink.length === 1 && redirect) {
    const { idDrink } = resposeApiLupaDrink[0];
    return <Redirect to={ `/bebidas/${idDrink}` } />;
  }
  return (
    <main>
      <CategoryDrinks />
      <ul>
        {arrayDrink.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <Link to={ `/bebidas/${idDrink}` } key={ index }>
            <li key={ idDrink } data-testid={ `${index}-recipe-card` }>
              <img
                width="80px"
                src={ strDrinkThumb }
                alt="imagem da bebida"
                data-testid={ `${index}-card-img` }
              />
              <div data-testid={ `${index}-card-name` }>{ strDrink }</div>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
