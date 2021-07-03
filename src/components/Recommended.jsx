/* import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DrinksContext from '../context/DrinksContext';
import '../styles/Recommended.css';

function Recommended() {
  const { allDrinks: { drinks } } = useContext(DrinksContext);
  const NUMBER_OF_ITEMS = 6;
  const [next, setNext] = useState(1);
  const [prev, setPrev] = useState(0);
  const [reload, setReload] = useState(true);

  function display(index) {
    if (index !== next && index !== prev) {
      return 'none';
    }
    return 'block';
  }

  const anterior = () => {
    if (prev === NUMBER_OF_ITEMS - 1) {
      setPrev(NUMBER_OF_ITEMS - 1);
    } else {
      setPrev(prev - 1);
    }
  };
  useEffect(() => {
    setReload(!reload);
  }, [next, prev, reload]);
  return (
    <section className="recommended">
      <h1>Recomendadas</h1>
      <div className="cards-recommended">
        <button type="button" onClick={ anterior }>&lt;</button>
        {
          drinks.slice(0, NUMBER_OF_ITEMS)
            .map((drink, index) => (
              <div
                className="card"
                data-testid={ `${index}-recipe-card` }
                key={ `${index}oi` }
                style={ { display: `${display(index)}` } }
              >
                <Link to={ `/bebidas/${drink.idDrink}` }>
                  <img
                    data-testid={ `${index}-recomendation-card` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                  <span data-testid="recipe-category">{ drink.strAlcoholic }</span>
                  <h5 data-testid={ `${index}-card-name` }>{drink.strDrink}</h5>
                </Link>
              </div>
            ))
        }
      </div>
    </section>
  );
}

export default Recommended;
 */
