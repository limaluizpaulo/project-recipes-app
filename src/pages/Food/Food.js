import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import requestMeal, {
  requestCategoryMeal,
  requestNamemeal,
  requestAllCategory } from '../../helpers/requests';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Food.css';
import Context from '../../Provider/context';

function Food() {
  const { dataFood, setDataFood } = useContext(Context);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameItem, setNameItem] = useState('');

  useEffect(() => {
    (async function resolved() {
      const resolveMeal = await requestMeal();
      const resolveCategory = await requestCategoryMeal();
      setDataFood(resolveMeal);
      setCategory(resolveCategory);
      setLoading(false);
    }());
  }, [setDataFood]);

  async function onClick({ target: { name } }) {
    if (name) {
      setNameItem(name);
      const request = await requestNamemeal(name);
      setDataFood(request);
    }
    if (name === nameItem) {
      const request = await requestMeal();
      setDataFood(request);
    }
  }

  async function allButton() {
    const request = await requestAllCategory();
    setDataFood(request);
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
        <div
          key={ index }
          className="card"
          data-testid={ `${index}-recipe-card` }
        >
          <Link to={ `/comidas/${item.idMeal}` }>
            <img
              className="card-img-top"
              data-testid={ `${index}-card-img` }
              src={ item.strMealThumb }
              alt={ `imagem de ${item}` }
              id={ item.idMeal }
            />
            {/* <p data-testid={ `${index}-card-name` }>{item.strMeal}</p> */}
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
        <div className="menu-box">
          { !loading && mapCategory(category)}
        </div>
        {
          loading
            ? 'Carregando...'
            : (mapData(dataFood))
        }
      </div>
      <Footer />
    </>
  );
}

export default Food;
