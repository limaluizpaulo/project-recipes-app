import React, { useEffect, useState } from 'react';
import fetchFood from '../services/FoodAPI';

export default function MealsByArea() {
  const LIST_AREAS = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const BY_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
  const [areas, setAreas] = useState(null);
  const [meals, setMeals] = useState([]);
  const [selectArea, setSelectArea] = useState('American');

  useEffect(() => {
    fetchFood(LIST_AREAS)
      .then((res) => setAreas(res));
  }, []);

  useEffect(() => {
    fetchFood(BY_AREA, selectArea)
      .then((res) => setMeals(res));
  }, [selectArea]);

  if (areas === null) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  return (
    <section>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (e) => setSelectArea(e.target.value) }
      >
        { areas.map((area, index) => (
          <option
            data-testid={ `${area.strArea}-option` }
            key={ index }
          >
            { area.strArea }
          </option>
        )) }
      </select>
      { meals.map((meal, i) => (
        <div key={ i }>
          <img src={ meal.strMealThumb } alt={ meal.strMeal } />
          <h3>{ meal.strMeal }</h3>
        </div>
      )) }
    </section>
  );
}
