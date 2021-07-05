import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/Context';
import { apiRequestFoods } from '../services/api/getMealsDrink';
import { apiCategoriesFoods } from '../services/api/getList';
import { requestCategoriesMael } from '../services/api/getCategories';

// Tela principal de receitas de comidas: /comidas
export default function MainFood({ history }) {
  const { data } = useContext(RecipeContext);
  const [valueButton, setValueButton] = useState('');
  const [dataFood, setDataFood] = useState([]);
  const [filterFood, setfilterFood] = useState([]);
  const [dataCategoriesFood, setDataCategoriesFood] = useState([]);
  const [filterCategoriesFood, setFilterCategoriesFood] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [filterDataCategories, setFilterDataCategories] = useState([]);
  const [toogle, setToogle] = useState(false);
  const [allValue, setAllValue] = useState('');

  console.log(dataFood);

  useEffect(() => {
    async function apiRequest() {
      const { meals } = await apiRequestFoods();
      setDataFood(meals);
    }
    apiRequest();
  }, []);

  useEffect(() => {
    async function apiRequestCategories() {
      const { meals } = await apiCategoriesFoods();
      setDataCategoriesFood(meals);
    }
    apiRequestCategories();
  }, []);

  useEffect(() => {
    async function categories() {
      if (valueButton !== '') {
        const { meals } = await requestCategoriesMael(valueButton) || [];
        setDataCategories(meals);
      }
    }
    categories();
  }, [valueButton]);

  useEffect(() => {
    const NUMBER_FILTER = 12;
    const NUMBER_FILTER_CATEGORIES = 5;
    setfilterFood(dataFood.slice(0, NUMBER_FILTER));
    setFilterCategoriesFood(dataCategoriesFood.slice(0, NUMBER_FILTER_CATEGORIES));
    setFilterDataCategories(dataCategories.slice(0, NUMBER_FILTER));
  }, [dataFood, dataCategoriesFood, dataCategories]);

  function handleOnClick({ target }) {
    setValueButton(target.value);
    setAllValue('');
    if (target.value !== valueButton) {
      setToogle(true);
    }
    if (target.value === valueButton) {
      setToogle(false);
      setValueButton('');
    }
  }

  async function handleAllOnclick({ target }) {
    setAllValue(target.value);
    setValueButton('');
    setToogle(false);
  }

  function buttonCategories() {
    return filterCategoriesFood.map((categ, i) => (
      <button
        type="button"
        key={ i }
        value={ categ.strCategory }
        data-testid={ `${categ.strCategory}-category-filter` }
        onClick={ handleOnClick }
      >
        {categ.strCategory}
      </button>
    ));
  }

  function renderMeal() {
    if (allValue === 'All' && valueButton === '') {
      return filterFood.map((itemAll, indexAll) => (
        <div key={ indexAll } data-testid={ `${indexAll}-recipe-card` }>
          <Link to={ `/comidas/${itemAll.idMeal}` }>
            <p data-testid={ `${indexAll}-card-name` }>{itemAll.strMeal}</p>
            <img
              src={ itemAll.strMealThumb }
              alt={ itemAll.strMealThumb }
              data-testid={ `${indexAll}-card-img` }
            />
          </Link>
        </div>
      ));
    }
    if (data.length === 0 && valueButton === '') {
      return filterFood.map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <Link to={ `/comidas/${item.idMeal}` }>
            <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
            <img
              src={ item.strMealThumb }
              alt={ item.strMealThumb }
              data-testid={ `${index}-card-img` }
            />
          </Link>
        </div>
      ));
    }
    if (valueButton !== '' && toogle) {
      return filterDataCategories.map((itemValue, i) => (
        <div key={ i } data-testid={ `${i}-recipe-card` }>
          <Link to={ `/comidas/${itemValue.idMeal}` }>
            <p data-testid={ `${i}-card-name` }>{itemValue.strMeal}</p>
            <img
              src={ itemValue.strMealThumb }
              alt={ itemValue.strMealThumb }
              data-testid={ `${i}-card-img` }
            />
          </Link>
        </div>
      ));
    }
    if (data.length === 1) {
      history.push(`/comidas/${data[0].idMeal}`);
    }
    return data.map((item, index) => (
      <div key={ index } data-testid={ `${index}-recipe-card` }>
        <Link to={ `/comidas/${item.idMeal}` }>
          <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
          <img
            src={ item.strMealThumb }
            alt={ item.strMealThumb }
            data-testid={ `${index}-card-img` }
          />
        </Link>
      </div>
    ));
  }

  return (
    <div>
      <h4>Meals</h4>
      <Header history={ history } title="Comidas" />
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          value="All"
          onClick={ handleAllOnclick }
        >
          All
        </button>
        {buttonCategories()}
      </div>
      {renderMeal()}
      <Footer />
    </div>
  );
}

MainFood.propTypes = {
  history: PropTypes.shape().isRequired,
};
