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
    <>
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
      <div>{renderMeal()}</div>
    </>
  );
}

export default RenderMeal;
