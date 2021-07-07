import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchFood from '../services/FoodAPI';
import '../styles/card.css';

export default function MealsByArea() {
  const LIST_AREAS = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const BY_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
  const [areas, setAreas] = useState([]);
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

  if (areas === []) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  const x = () => (
    <select
      data-testid="explore-by-area-dropdown"
      onChange={ (e) => setSelectArea(e.target.value) }
    >
      <option data-testid="American-option">American</option>
      <option data-testid="British-option">British</option>
      <option data-testid="Canadian-option">Canadian</option>
      <option data-testid="Chinese-option">Chinese</option>
      <option data-testid="Dutch-option">Dutch</option>
      <option data-testid="Egyptian-option">Egyptian</option>
      <option data-testid="French-option">French</option>
      <option data-testid="Greek-option">Greek</option>
      <option data-testid="Indian-option">Indian</option>
      <option data-testid="Irish-option">Irish</option>
      <option data-testid="Italian-option">Italian</option>
      <option data-testid="Jamaican-option">Jamaican</option>
      <option data-testid="Japanese-option">Japanese</option>
      <option data-testid="Kenyan-option">Kenyan</option>
      <option data-testid="Malaysian-option">Malaysian</option>
      <option data-testid="Mexican-option">Mexican</option>
      <option data-testid="Moroccan-option">Moroccan</option>
      <option data-testid="Polish-option">Polish</option>
      <option data-testid="Portuguese-option">Portuguese</option>
      <option data-testid="Russian-option">Russian</option>
      <option data-testid="Spanish-option">Spanish</option>
      <option data-testid="Thai-option">Thai</option>
      <option data-testid="Tunisian-option">Tunisian</option>
      <option data-testid="Turkish-option">Turkish</option>
      <option data-testid="Unknown-option">Unknown</option>
      <option data-testid="Vietnamese-option">Vietnamese</option>
      <option data-testid="All-option">All</option>
    </select>
  );

  return (
    <section>
      {/* <select
        data-testid="explore-by-area-dropdown"
        onChange={ (e) => setSelectArea(e.target.value) }
      >
        { [...areas].map((area) => (
          <option
            data-testid={ `${area.strArea}-option` }
            key={ area.strArea }
          >
            { area.strArea }
          </option>
        )) }
      </select> */}
      { x() }
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
