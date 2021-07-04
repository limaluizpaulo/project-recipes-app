import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/Context';
import { apiRequestDrinks } from '../services/api/getMealsDrink';
import { apiCategoriesDrinks } from '../services/api/getCategories';

// Tela principal de receitas de bebidas: /bebidas;
export default function MainDrink({ history }) {
  const { data } = useContext(RecipeContext);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [filterDrinks, setFiltersDrinks] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [filterCategoriesDrinks, setFilterCategoriesDrinks] = useState([]);

  console.log(data);

  useEffect(() => {
    async function apiRequest() {
      const { drinks } = await apiRequestDrinks();
      setDataDrinks(drinks);
    }
    apiRequest();
  }, []);

  useEffect(() => {
    const FILTER_NUMBER = 12;
    setFiltersDrinks(dataDrinks.slice(0, FILTER_NUMBER));
  }, [dataDrinks]);

  useEffect(() => {
    async function apiRequestCategories() {
      const { drinks } = await apiCategoriesDrinks();
      setCategoriesDrinks(drinks);
    }
    apiRequestCategories();
  }, []);

  useEffect(() => {
    const NUMBER_FILTER_CATEGORIES = 5;
    setFilterCategoriesDrinks(categoriesDrinks.slice(0, NUMBER_FILTER_CATEGORIES));
  }, [categoriesDrinks]);

  function buttonCategories() {
    return filterCategoriesDrinks.map((categ, i) => (
      <button
        type="button"
        key={ i }
        data-testid={ `${categ.strCategory}-category-filter` }
      >
        {categ.strCategory}
      </button>
    ));
  }

  function renderDrinks() {
    if (data.length === 0) {
      return filterDrinks.map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <p
            data-testid={ `${index}-card-name` }
          >
            {item.strDrink}
          </p>
          <img
            src={ item.strDrinkThumb }
            alt={ item.strDrinkThumb }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ));
    }
    if (data.length === 1) {
      history.push(`/bebidas/${data[0].idDrink}`);
    }
    if (data.length > 1) {
      return data.map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <p data-testid={ `${index}-card-name` }>
            {' '}
            {item.strDrink}
          </p>
          <img
            src={ item.strDrinkThumb }
            alt={ item.strDrinkThumb }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ));
    }
  }

  return (
    <div>
      <h4>Drinks</h4>
      <Header history={ history } title="Bebidas" />
      {buttonCategories()}
      {renderDrinks()}
      <Footer />
    </div>
  );
}

MainDrink.propTypes = {
  history: PropTypes.shape().isRequired,
};
