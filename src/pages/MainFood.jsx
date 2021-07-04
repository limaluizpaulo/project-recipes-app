import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/Context';
import { apiRequestFoods } from '../services/api/getMealsDrink';
import { apiCategoriesFoods } from '../services/api/getCategories';

// Tela principal de receitas de comidas: /comidas
export default function MainFood({ history }) {
  const { data } = useContext(RecipeContext);
  const [dataFood, setDataFood] = useState([]);
  const [filterFood, setfilterFood] = useState([]);
  const [categoriesFood, setCategoriesFood] = useState([]);
  const [filterCategoriesFood, setFilterCategoriesFood] = useState([]);

  console.log(filterCategoriesFood);

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
      setCategoriesFood(meals);
    }
    apiRequestCategories();
  }, []);

  useEffect(() => {
    const NUMBER_FILTER = 12;
    setfilterFood(dataFood.slice(0, NUMBER_FILTER));
  }, [dataFood]);

  useEffect(() => {
    const NUMBER_FILTER_CATEGORIES = 5;
    setFilterCategoriesFood(categoriesFood.slice(0, NUMBER_FILTER_CATEGORIES));
  }, [categoriesFood]);

  function buttonCategories() {
    return filterCategoriesFood.map((categ, i) => (
      <button
        type="button"
        key={ i }
        data-testid={ `${categ.strCategory}-category-filter` }
      >
        {categ.strCategory}
      </button>
    ));
  }

  function renderMeal() {
    if (data.length === 0) {
      return filterFood.map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
          <img
            src={ item.strMealThumb }
            alt={ item.strMealThumb }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ));
    }
    if (data.length === 1) {
      history.push(`/comidas/${data[0].idMeal}`);
    }
    return data.map((item, index) => (
      <div key={ index } data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
        <img
          src={ item.strMealThumb }
          alt={ item.strMealThumb }
          data-testid={ `${index}-card-img` }
        />
      </div>
    ));
  }

  return (
    <div>
      <h4>Meals</h4>
      <Header history={ history } title="Comidas" />
      {buttonCategories()}
      {renderMeal()}
      <Footer />
    </div>
  );
}

MainFood.propTypes = {
  history: PropTypes.shape().isRequired,
};
