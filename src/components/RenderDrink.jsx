import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../context/Context';
import { apiRequestDrinks } from '../services/api/getMealsDrink';
import { apiCategoriesDrinks } from '../services/api/getList';
import { requestCategoriesDrink } from '../services/api/getCategories';

// Tela principal de receitas de bebidas: /bebidas;
export default function MainDrink() {
  const { data } = useContext(RecipeContext);

  const history = useHistory();

  const [valueButton, setValueButton] = useState('');
  const [dataDrinks, setDataDrinks] = useState([]);
  const [filterDrinks, setFiltersDrinks] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [filterCategoriesDrinks, setFilterCategoriesDrinks] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [filterDataCategories, setFilterDataCategories] = useState([]);
  const [toogle, setToogle] = useState(false);
  const [allValue, setAllValue] = useState('');

  useEffect(() => {
    async function apiRequest() {
      const { drinks } = await apiRequestDrinks();
      setDataDrinks(drinks);

      const { drinks: drinksCategoriesList } = await apiCategoriesDrinks();
      setCategoriesDrinks(drinksCategoriesList);

      if (valueButton !== '') {
        const { drinks: cateDrinks } = await requestCategoriesDrink(valueButton) || [];
        setDataCategories(cateDrinks);
      }
    }
    apiRequest();
  }, [valueButton]);

  useEffect(() => {
    const FILTER_NUMBER = 12;
    const NUMBER_FILTER_CATEGORIES = 5;
    setFiltersDrinks(dataDrinks.slice(0, FILTER_NUMBER));
    setFilterCategoriesDrinks(categoriesDrinks.slice(0, NUMBER_FILTER_CATEGORIES));
    setFilterDataCategories(dataCategories.slice(0, FILTER_NUMBER));
  }, [dataDrinks, categoriesDrinks, dataCategories]);

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
    return filterCategoriesDrinks.map((categ, i) => (
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

  function renderDrinks() {
    if (allValue === 'All' && valueButton === '') {
      return filterDrinks.map((itemAll, indexAll) => (
        <div key={ indexAll } data-testid={ `${indexAll}-recipe-card` }>
          <Link to={ `/comidas/${itemAll.idDrink}` }>
            <p data-testid={ `${indexAll}-card-name` }>{itemAll.strDrink}</p>
            <img
              src={ itemAll.strDrinkThumb }
              alt={ itemAll.strDrinkThumb }
              data-testid={ `${indexAll}-card-img` }
            />
          </Link>
        </div>
      ));
    }
    if (data.length === 0 && valueButton === '') {
      return filterDrinks.map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <Link to={ `/bebidas/${item.idDrink}` }>
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
          </Link>
        </div>
      ));
    }
    if (valueButton !== '' && toogle) {
      return filterDataCategories.map((itemValue, i) => (
        <div key={ i } data-testid={ `${i}-recipe-card` }>
          <Link to={ `/bebidas/${itemValue.idDrink}` }>
            <p data-testid={ `${i}-card-name` }>{itemValue.strDrink}</p>
            <img
              src={ itemValue.strDrinkThumb }
              alt={ itemValue.strDrinkThumb }
              data-testid={ `${i}-card-img` }
            />
          </Link>
        </div>
      ));
    }
    if (data.length === 1) {
      history.push(`/bebidas/${data[0].idDrink}`);
    }
    if (data.length > 1) {
      return data.map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <Link to={ `/bebidas/${item.idDrink}` }>
            <p data-testid={ `${index}-card-name` }>
              {' '}
              {item.strDrink}
            </p>
            <img
              src={ item.strDrinkThumb }
              alt={ item.strDrinkThumb }
              data-testid={ `${index}-card-img` }
            />
          </Link>
        </div>
      ));
    }
  }

  return (
    <div>
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
      {renderDrinks()}
    </div>
  );
}
