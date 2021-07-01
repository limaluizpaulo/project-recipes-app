import React, { useState, useEffect } from 'react';
import { requestDrink,
  requestCategoryDrink, requestNameDrink } from '../../helpers/requests';
import Header from '../../components/Header/Header';
import './Drinks.css';
import React from 'react';
import Footer from '../components/Footer/Footer';

function Drinks() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    (async function resolved() {
      const resolveDrinks = await requestDrink();
      const resolveCategory = await requestCategoryDrink();
      setData(resolveDrinks);
      setCategory(resolveCategory);
      setLoading(false);
    }());
  }, []);

  async function onClick({ target: { name } }) {
    const request = await requestNameDrink(name);
    setData(request);
    setFilter(true);
  }

  function mapCategory({ drinks }) {
    const magicNumber = 5;
    return drinks
      .filter((_, index) => index < magicNumber)
      .map((item, index) => (
        <button
          key={ index }
          type="button"
          onClick={ onClick }
          name={ item.strCategory }
          data-testid={ `${item.strCategory}-category-filter` }
        >
          {item.strCategory}
        </button>));
  }

  function mapData({ drinks }, filtered) {
    const notFilter = 12;
    const yepFilter = 5;
    const magicNumber = filtered ? yepFilter : notFilter;
    return drinks.filter((_, index) => index < magicNumber)
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
    <>
      <Header title="Bebidas" />
      <div className="card-meals">
        { !loading && mapCategory(category)}
        {
          loading
            ? 'Carregando...'
            : (mapData(data, filter))
        }
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
