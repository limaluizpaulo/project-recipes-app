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

  return (
    renderMeal()
  );
};

export default RenderMealIngredient;
