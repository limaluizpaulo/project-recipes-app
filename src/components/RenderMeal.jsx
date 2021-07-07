import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../context/Context';
import { apiRequestFoods } from '../services/api/getMealsDrink';
import { apiCategoriesFoods } from '../services/api/getList';
import { requestCategoriesMael } from '../services/api/getCategories';

// Tela principal de receitas de comidas: /comidas
function RenderMeal() {
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

  const history = useHistory();

  useEffect(() => {
    async function apiRequest() {
      const { meals } = await apiRequestFoods() || [];
      setDataFood(meals);

      const { meals: mealsCategoriesList } = await apiCategoriesFoods() || [];
      setDataCategoriesFood(mealsCategoriesList);

      if (valueButton !== '') {
        const { meals: categoriesFood } = await requestCategoriesMael(valueButton) || [];
        setDataCategories(categoriesFood);
      }
    }
    apiRequest();
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
        className="food__category__button"
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
        <Link
          className="food__card"
          data-testid={ `${indexAll}-recipe-card` }
          key={ indexAll }
          to={ `/comidas/${itemAll.idMeal}` }
        >
          <div className="food__card__img">
            <img
              src={ itemAll.strMealThumb }
              alt={ itemAll.strMealThumb }
              data-testid={ `${indexAll}-card-img` }
            />
          </div>
          <p data-testid={ `${indexAll}-card-name` }>{itemAll.strMeal}</p>
        </Link>
      ));
    }
    if (data.length === 0 && valueButton === '') {
      return filterFood.map((item, index) => (
        <Link
          className="food__card"
          data-testid={ `${index}-recipe-card` }
          key={ index }
          to={ `/comidas/${item.idMeal}` }
        >
          <div className="food__card__img">
            <img
              src={ item.strMealThumb }
              alt={ item.strMealThumb }
              data-testid={ `${index}-card-img` }
            />
          </div>
          <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
        </Link>
      ));
    }
    if (valueButton !== '' && toogle) {
      return filterDataCategories.map((itemValue, i) => (
        <Link
          className="food__card"
          key={ i }
          data-testid={ `${i}-recipe-card` }
          to={ `/comidas/${itemValue.idMeal}` }
        >
          <div className="food__card__img">

            <img
              src={ itemValue.strMealThumb }
              alt={ itemValue.strMealThumb }
              data-testid={ `${i}-card-img` }
            />

          </div>
          <p data-testid={ `${i}-card-name` }>{itemValue.strMeal}</p>
        </Link>
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
  // <div className="foodPage">
  // <div className="food__category__container">
  return (
    <div className="foodPage">
      <div className="food__category__container">
        <button
          className="food__category__button"
          data-testid="All-category-filter"
          type="button"
          value="All"
          onClick={ handleAllOnclick }
        >
          All
        </button>
        {buttonCategories()}
      </div>
      <div className="food__cards__container">{renderMeal()}</div>
    </div>
  );
}

export default RenderMeal;
