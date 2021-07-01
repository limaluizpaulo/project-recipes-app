import React, { useState, useEffect } from 'react';
import requestMeal from '../../helpers/requests';
import Header from '../../components/Header/Header';
import './Food.css';
import { Link } from 'react-router-dom';

function Food() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function resolved() {
      const resolve = await requestMeal();
      setData(resolve);
      console.log(resolve);
      setLoading(false);
    }());
  }, []);

  function mapData(param) {
    const { meals } = param;
    const magicNumber = 12;
    return meals
      .filter((_, index) => index < magicNumber)
      .map((item, index) => (
        <div key={ index } className="card-meals-items">
          <Link to="/comidas/:id">Detalhes</Link>
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strMealThumb }
            alt={ `imagem de ${item}` }
          />
          <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
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
