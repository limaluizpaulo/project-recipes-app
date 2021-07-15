import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AREA_SELECTED, fetchAPI, MEALS } from '../../services/index';
import store, { setFetchOnDone } from '../../context/store';

export default function CardMealsArea({ datacard }) {
  const [dataOrigin, setDataOrigin] = useState('');
  const { recipes: { cardsLimit }, setRecipes } = useContext(store);

  async function getAreaMeals() {
    if (datacard === 'All') {
      const mealsArea = await fetchAPI(MEALS);
      setDataOrigin(mealsArea.meals);
    } else {
      const mealsArea = await fetchAPI(`${AREA_SELECTED}${datacard}`);
      setDataOrigin(mealsArea.meals);
    }
  }
  useEffect(() => {
    getAreaMeals();
  }, []);

  useEffect(() => {
    getAreaMeals();
  }, [datacard]);

  const handleClick = () => {
    setRecipes(setFetchOnDone(true));
  };

  return (
    dataOrigin
      ? (
        <div className="recipes">
          {dataOrigin.slice(0, cardsLimit).map((item, index) => (
            <Link
              to={ `/comidas/${item.idMeal}` }
              key={ item.idMeal }
            >
              <button
                type="button"
                data-testid={ `${index}-recipe-card` }
                className="recipe"
                onClick={ handleClick }
              >
                <img
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  data-testid={ `${index}-card-img` }
                  className="recipeImg"
                />
                <h4
                  data-testid={ `${index}-card-name` }
                  className="recipeTitle"
                >
                  {item.strMeal}
                </h4>
              </button>
            </Link>
          ))}
        </div>) : <h5>Loading...</h5>
  );
}

CardMealsArea.propTypes = {
  datacard: PropTypes.string.isRequired,
};
