import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ContextRecipes from '../context/contextRecipes';
import Footer from './Footer';
import Header from './Header';
import SBElements from './SBElements';

function ExpAreaFood({ history }) {
  const {
    goSearch,
    setTitle,
    areas,
    setAreas,
    foodByArea,
    setFoodByArea,
  } = useContext(ContextRecipes);

  const fetchArea = () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setAreas(results.meals)));
  };

  useEffect(() => {
    fetchArea();
  }, []);

  const [areaSelected, setAreaSelected] = useState('American');

  const maxLength = 11;
  useEffect(() => {
    setTitle('Explorar Origem');
  }, [setTitle]);

  const fetchFoodByArea = (selectedArea) => {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setFoodByArea(results.meals)));
  };

  useEffect(() => {
    fetchFoodByArea(areaSelected);
  }, [areaSelected]);

  const handleChange = (event) => {
    setAreaSelected(event.target.value);
  };

  return (
    <div>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <h1>Explorar Origem</h1>
      <select
        data-testid="explore-by-area-dropdown"
        value={ areaSelected }
        onChange={ (event) => handleChange(event) }
      >
        {
          areas && areas.map(({ strArea }, index) => (
            <option
              data-testid={ `${strArea}-option` }
              value={ strArea }
              key={ `${index}` }
            >
              {strArea}
            </option>
          ))
        }
        ;
        <option
          data-testid="All-option"
          value="All"
        >
          All
        </option>
      </select>
      <section>
        {foodByArea && foodByArea
          // https://stackoverflow.com/questions/42374873/limit-items-in-a-map-loop/42374933
          .map(({ idMeal, strMeal, strMealThumb }, index) => index <= maxLength && (
            <Link to={ `/comidas/${idMeal}` } key={ idMeal }>
              <article data-testid={ `${index}-recipe-card` }>
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  width="150"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
              </article>
            </Link>))}
      </section>
      <Footer history={ history } />
    </div>
  );
}

ExpAreaFood.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default ExpAreaFood;
