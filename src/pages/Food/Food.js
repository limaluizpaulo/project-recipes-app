import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import requestMeal,
{
  requestCategoryMeal,
  requestNamemeal,
  requestAllCategory } from '../../helpers/requests';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
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

  async function allButton() {
    const request = await requestAllCategory();
    setData(request);
  }

  function mapCategory({ meals, categories }) {
    const magicNumber = 5;
    const verify = meals || categories;
    return verify
      .filter((_, index) => index < magicNumber)
      .map((item, index) => {
        if (index === 0) {
          return (
            <>
              <button
                type="button"
                data-testid="All-category-filter"
                onClick={ allButton }
              >
                All
              </button>
              <button
                key={ index }
                name={ item.strCategory }
                type="button"
                data-testid={ `${item.strCategory}-category-filter` }
                onClick={ onClick }
              >
                {item.strCategory}
              </button>
            </>
          );
        } return (
          <button
            key={ index }
            name={ item.strCategory }
            type="button"
            data-testid={ `${item.strCategory}-category-filter` }
            onClick={ onClick }
          >
            {item.strCategory}
          </button>
        );
      });
  }

  function mapData({ meals }) {
    const magicNumber = 12;
    return meals
      .filter((_, index) => index < magicNumber)
      .map((item, index) => (
        <div key={ index } className="card" data-testid={ `${index}-recipe-card` }>
          <Link to={ `/comidas/${item.idMeal}` }>
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
          </Link>
        </div>
      ));
  }

  return (
    <>
      <Header title="Comidas" haveSrc />
      <div className="card-meals">
        <di className="menu-box">
          { !loading && mapCategory(category)}
        </di>
        {
          loading
            ? 'Carregando...'
            : (mapData(data))
        }
      </div>
      <Footer />
    </>
  );
}

export default Food;
