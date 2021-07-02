import React, { useContext } from 'react';
import RecipesContext from '../Context/RecipesContext';

export default function CardDrink() {
  const { resposeApiLupaDrink } = useContext(RecipesContext);
  const twelve = 12;
  let arrayDrink = resposeApiLupaDrink;
  if (resposeApiLupaDrink.length > twelve) {
    arrayDrink = resposeApiLupaDrink.filter((_e, index) => index < twelve);
  }

  return (
    <main>
      <ul>
        {arrayDrink.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <li key={ idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              width="80px"
              src={ strDrinkThumb }
              alt="imagem da bebida"
              data-testid={ `${index}-card-img` }
            />
            <div data-testid={ `${index}-card-name` }>{ strDrink }</div>
          </li>))}
      </ul>
    </main>
  );
}
