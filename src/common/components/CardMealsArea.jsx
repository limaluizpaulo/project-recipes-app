import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AREA_SELECTED, fetchAPI, MEALS } from '../../services/index';
import store, { setLoading } from '../../context/store';

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
    setRecipes(setLoading(true));
  };

  return (
    dataOrigin
      ? (
        <div>
          {dataOrigin.slice(0, cardsLimit).map((item, index) => (
            <Link
              to={ `/comidas/${item.idMeal}` }
              key={ item.idMeal }
              onClick={ handleClick }
            >
              <div
                data-testid={ `${index}-recipe-card` }
              >
                <div
                  className="imgContainer"
                >
                  <img
                    src={ item.strMealThumb }
                    alt={ item.strMeal }
                    data-testid={ `${index}-card-img` }
                    width="150px"
                  />
                  <span data-testid={ `${index}-card-name` }>{item.strMeal}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>) : <h5>Loading...</h5>
  );
}

CardMealsArea.propTypes = {
  datacard: PropTypes.string.isRequired,
};
