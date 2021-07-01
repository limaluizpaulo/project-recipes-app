import React, { useState, useEffect } from 'react';
import requestMeal,
{ requestCategoryMeal, requestNamemeal } from '../../helpers/requests';
import Header from '../../components/Header/Header';
import './Food.css';

function Food() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameItem, setNameItem] = useState('');

  useEffect(() => {
    (async function resolved() {
      const resolveMeal = await requestMeal();
      const resolveCategory = await requestCategoryMeal();
      setData(resolveMeal);
      setCategory(resolveCategory);
      setLoading(false);
    }());
  }, []);

  async function onClick({ target: { name } }) {
    if (name) {
      setNameItem(name);
      const request = await requestNamemeal(name);
      setData(request);
    }
    if (name === nameItem) {
      const request = await requestMeal();
      setData(request);
    }
  }

  function mapCategory({ meals }) {
    const magicNumber = 5;
    return meals
      .filter((_, index) => index < magicNumber)
      .map((item, index) => (
        <button
          key={ index }
          name={ item.strCategory }
          type="button"
          data-testid={ `${item.strCategory}-category-filter` }
          onClick={ onClick }
        >
          {item.strCategory}
        </button>
      ));
  }

  function mapData({ meals }) {
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
    <>
      <Header title="Comidas" />
      <div className="card-meals">
        { !loading && mapCategory(category)}
        {
          loading
            ? 'Carregando...'
            : (mapData(data))
        }
      </div>
    </>
  );
}

export default Food;
