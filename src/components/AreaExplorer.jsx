import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchMealsArea, fetchMealsByArea, fetchAllMeals } from '../Service/foodApi';
import RecipesContext from '../Context/RecipesContext';

import CardMeal from './CardMeal';
import Footer from './Footer';
import Header from './Header';

export default function AreaExplorer() {
  const { setResponseApiLupaMeal } = useContext(RecipesContext);

  const [fetchedAreas, setfetchedAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');

  const length = useHistory();

  const getApiAll = () => {
    fetchMealsArea().then((result) => setfetchedAreas(result));
    fetchAllMeals().then((result) => setResponseApiLupaMeal(result));
    console.log(length);
  };

  useEffect(getApiAll, []);

  const handleChange = ({ target }) => {
    const { value } = target;

    setSelectedArea(value);
    if (value === 'All') {
      fetchAllMeals().then((result) => setResponseApiLupaMeal(result));
    } else {
      fetchMealsByArea(value).then((result) => setResponseApiLupaMeal(result));
    }
  };

  return (
    // {}
    <div>
      <Header />

      <label htmlFor="area">
        <select
          name="area"
          id="area"
          value={ selectedArea }
          onChange={ handleChange }
          data-testid="explore-by-area-dropdown"
        >
          <option
            data-testid="All-option"
            value="all"
          >
            All
          </option>
          { fetchedAreas.map((area) => (
            <option
              key={ area.strArea }
              data-testid={ `${area.strArea}-option` }
              value={ area.strArea }
            >
              { area.strArea }
            </option>
          ))}
        </select>
      </label>

      <CardMeal />
      <Footer />
    </div>
  );
}
