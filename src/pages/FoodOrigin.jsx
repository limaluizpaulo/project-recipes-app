import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchOriginFood from '../RequisiçõesAPI/food/RequestByOrigin';
import fetchAllFoods from '../RequisiçõesAPI/food/RequestAll';
import fetchFilterByArea from '../RequisiçõesAPI/food/RequestFilterByArea';

export default function FoodOrigin() {
  const [foodOrigin, setFoodOrigin] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState([]);
  const [foodOptionSelected, setFoodOptionSelected] = useState('All');

  const history = useHistory();

  useEffect(() => {
    const handleFoodOrigin = async () => {
      const response = await fetchOriginFood();
      const result = await response.meals;
      setFoodOrigin(result);
    };
    handleFoodOrigin();
  }, []);

  useEffect(() => {
    const handleAllFoods = async () => {
      const zero = 0;
      const twelve = 12;
      const response = await fetchAllFoods();
      const result = await response.meals;
      const twelveIngredients = result.slice(zero, twelve);
      setSelectedOrigin(twelveIngredients);
    };
    const handleSelectedFood = async (foodSelected) => {
      const zero = 0;
      const twelve = 12;
      const response = await fetchFilterByArea(foodSelected);
      const result = await response.meals;
      const twelveIngredients = result.slice(zero, twelve);
      setSelectedOrigin(twelveIngredients);
    };
    if (foodOptionSelected === 'All') {
      handleAllFoods();
    } else {
      handleSelectedFood(foodOptionSelected);
    }
  }, [foodOptionSelected]);

  // const handleChange

  return (
    <div>
      {console.log(selectedOrigin)}
      <Header title="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (e) => setFoodOptionSelected(e.target.value) }
      >
        <option name="origin" data-testid="All-option">All</option>
        { foodOrigin.map((origins, i) => (
          <option
            key={ i }
            data-testid={ `${origins.strArea}-option` }
            name="origin"
          >
            {origins.strArea}
          </option>
        ))}
      </select>
      <div>
        {selectedOrigin.map((selected, i) => (
          <button
            type="button"
            key={ i }
            data-testid={ `${i}-recipe-card` }
            onClick={ () => history.push(`/comidas/${selected.idMeal}`) }
          >
            <img
              key={ i }
              data-testid={ `${i}-card-img` }
              alt="ingredient"
              src={ selected.strMealThumb }
            />
            <p data-testid={ `${i}-card-name` }>{selected.strMeal}</p>
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}
