import React, { useState, useEffect } from 'react';
import requestMeal from '../../helpers/requests';
import Header from '../../components/Header/Header';
import './Food.css';

function Food() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function resolved() {
      const resolve = await requestMeal();
      setData(resolve);
      setLoading(false);
    }());
  }, []);

  function mapData(param) {
    const { meals } = param;
    const magicNumber = 12;
    return meals
      .filter((_, index) => index < magicNumber)
      .map((item, index) => (
        <div key={ index } className="card" data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strMealThumb }
            className="card-img-top"
            alt={ `imagem de ${item}` }
          />
          <h5
            data-testid={ `${index}-card-name` }
            className="card-title"
          >
            {item.strMeal}
          </h5>
        </div>
      ));
  }

  return (
    <div className="card-meals">
      <Header title="Comidas" />
      {
        loading
          ? 'Carregando...'
          : (mapData(data))
      }
    </div>
  );
}

export default Food;
