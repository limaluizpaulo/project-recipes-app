import React, { useContext } from 'react';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
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
      <ul className="ulCard">
        {arrayMeal.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <div className="main-card" key={ idMeal }>
            <Link to={ `/comidas/${idMeal}` } key={ index }>
              <Card
                border="dark"
                style={ { width: '10rem' } }
                className="mb-2 shadownCard"
                bg="dark"
                text="white"
              >
                <Card.Img
                  variant="top"
                  src={ strMealThumb }
                  alt="imagem receita"
                  data-testid={ `${index}-card-img` }
                />
                <Card.Body>
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    { strMeal }

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
