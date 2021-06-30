import React, { useState, useEffect } from 'react';
import { requestDrink } from '../../functions/requests';
import Header from '../Header/Header';
import './Drinks.css';

function Drinks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function resolved() {
      const resolve = await requestDrink();
      setData(resolve);
      setLoading(false);
    }());
  }, []);

  function mapData(param) {
    const { drinks } = param;
    const magicNumber = 12;
    return drinks
      .filter((_, index) => index < magicNumber)
      .map((item, index) => (
        <div key={ index } className="card" data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strDrinkThumb }
            className="card-img-top"
            alt={ `imagem de ${item}` }
          />
          <h5
            data-testid={ `${index}-card-name` }
          >
            {item.strDrink}
          </h5>
        </div>
      ));
  }

  return (
    <div className="card-meals">
      <Header title="Bebidas" />
      {
        loading
          ? 'Carregando...'
          : (mapData(data))
      }
    </div>
  );
}

export default Drinks;
