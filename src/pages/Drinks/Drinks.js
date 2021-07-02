import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  requestDrink,
  requestCategoryDrink,
  requestNameDrink,
  requestAllDrinkCategory } from '../../helpers/requests';
import Header from '../../components/Header/Header';
import './Drinks.css';

function Drinks() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameItem, setNameItem] = useState('');

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
    if (name && name !== '') {
      setNameItem(name);
      const request = await requestNameDrink(name);
      setData(request);
    }
    if (name === nameItem) {
      const request = await requestDrink();
      setData(request);
    }
  }

  async function allButton() {
    const request = await requestAllDrinkCategory();
    setData(request);
  }

  function mapCategory({ drinks }) {
    const magicNumber = 5;
    return drinks
      .filter((_, index) => index < magicNumber)
      .map((item, index) => {
        if (index === 0) {
          return (
            <>
              <button
                type="button"
                data-testid="All-category-filter"
                value="All"
                onClick={ allButton }
              >
                All
              </button>
              <button
                key={ index }
                type="button"
                onClick={ onClick }
                name={ item.strCategory }
                data-testid={ `${item.strCategory}-category-filter` }
              >
                {item.strCategory}
              </button>
            </>
          );
        } return (
          <button
            key={ index }
            type="button"
            onClick={ onClick }
            name={ item.strCategory }
            data-testid={ `${item.strCategory}-category-filter` }
          >
            {item.strCategory}
          </button>
        );
      });
  }

  function mapData({ drinks }) {
    console.log(drinks);
    const magicNumber = 12;
    const all = 25;
    if (drinks.length === all) {
      return drinks
        .filter((_, index) => index < magicNumber)
        .map((item, index) => (
          <div key={ index } className="card" data-testid={ `${index}-recipe-card` }>
            <Link to={ `/bebidas/${item.idDrink}` }>
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
            </Link>
          </div>
        ));
    }
    return drinks
      .filter((_, index) => index < magicNumber)
      .map((item, index) => (
        <div key={ index } className="card" data-testid={ `${index}-recipe-card` }>
          <Link to={ `/bebidas/${item.idDrink}` }>
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
          </Link>
        </div>
      ));
  }

  return (
    <>
      <Header title="Bebidas" haveSrc />
      <div className="card-meals">
        { !loading && mapCategory(category)}
        {
          loading
            ? 'Carregando...'
            : (mapData(data))
        }
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Drinks;
