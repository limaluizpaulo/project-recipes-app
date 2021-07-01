import React, { useState, useEffect } from 'react';
import requestMeal,
{ requestCategoryMeal, requestNamemeal } from '../../helpers/requests';
// import onClick from '../../helpers/onClickAliments';
import Header from '../../components/Header/Header';
import './Food.css';

function Food() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);

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
    const request = await requestNamemeal(name);
    setData(request);
    setFilter(true);
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
        </button>));
  }

  function mapData({ meals }, filtered) {
    const notFilter = 12;
    const yepFilter = 5;
    const magicNumber = filtered ? yepFilter : notFilter;
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
            : (mapData(data, filter))
        }
      </div>
    </>
  );
}

export default Food;
