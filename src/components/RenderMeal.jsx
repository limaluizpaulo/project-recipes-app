import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../context/Context';

const RenderMealIngredient = () => {
  const {
    data,
    valueButton,
    filterFood,
    filterDataCategories,
    toogle,
    allValue,
  } = useContext(RecipeContext);

  const history = useHistory();

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
    <div>{renderMeal()}</div>
  );
};

export default RenderMealIngredient;
