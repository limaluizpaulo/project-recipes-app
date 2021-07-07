import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchFood from '../services/FoodAPI';
import '../styles/card.css';

export default function MealsByArea() {
  const LIST_AREAS = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const BY_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
  const [areas, setAreas] = useState(null);
  const [meals, setMeals] = useState([]);
  const [selectArea, setSelectArea] = useState('American');
  const limitMap = 12;
  const history = useHistory();

  useEffect(() => {
    fetchFood(LIST_AREAS)
      .then((res) => setAreas(res));
  }, []);

  useEffect(() => {
    fetchFood(BY_AREA, selectArea)
      .then((res) => setMeals(res));
  }, [selectArea]);

  function clickRecipe({ target }) {
    const { push } = history;
    console.log(target);
    return push(`/comidas/${target.name}`);
  }

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
        { areas.map((area) => (
          <option
            data-testid={ `${area.strArea}-option` }
            key={ area.strArea }
          >
            { area.strArea }
          </option>
        )) }
        <option data-testid="All-option">All</option>
      </select>
      <div className="card-container">
        { meals.slice(0, limitMap).map((meal, i) => (
          <button
            type="button"
            data-testid={ `${i}-recipe-card` }
            className="recipe-card"
            key={ i }
            onClick={ (e) => clickRecipe(e) }
          >
            <img
              name={ meal.idMeal }
              data-testid={ `${i}-card-img` }
              className="card-img"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
            <h4
              name={ meal.idMeal }
              data-testid={ `${i}-card-name` }
            >
              { meal.strMeal }
            </h4>
          </button>
        )) }
      </div>
    </section>
  );
}
