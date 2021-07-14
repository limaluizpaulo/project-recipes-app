import React, { useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import RecipesContext from '../Context/RecipesContext';

import CategoryDrinks from './CategoryDrinks';

export default function CardDrink() {
  const { resposeApiLupaDrink, redirect } = useContext(RecipesContext);
  const twelve = 12;
  let arrayDrink = resposeApiLupaDrink;

  if (resposeApiLupaDrink === null || !resposeApiLupaDrink) {
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
      <ul className="ulCard">
        {arrayDrink.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <div className="main-card" key={ idDrink }>
            <Link to={ `/bebidas/${idDrink}` }>
              <Card
                border="dark"
                style={ { width: '10rem' } }
                className="mb-2 shadownCard"
                bg="dark"
                text="white"
              >
                <Card.Img
                  variant="top"
                  src={ strDrinkThumb }
                  alt="imagem receita"
                  data-testid={ `${index}-card-img` }
                />
                <Card.Body>
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    { strDrink }

                  </Card.Title>

                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </ul>
    </main>
  );
}
