import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';

const BASE_URL_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const BASE_URL_MEAL_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const MAX_NUMBER_OF_ITEMS = 12;

function FoodOrigin() {
  const { areas, recipes, setRecipes, showSearch } = useContext(RecipeContext);
  const [origin, setOrigin] = useState('All');

  async function filterByOrigin() {
    const fetchSearch = origin === 'All'
      ? await fetch(BASE_URL_MEAL)
      : await fetch(`${BASE_URL_MEAL_AREA}${origin}`);
    const response = await fetchSearch.json();
    // console.log(response.meals);
    const filteredValues = response.meals.slice(0, MAX_NUMBER_OF_ITEMS);
    setRecipes(filteredValues);
  }

  useEffect(() => {
    filterByOrigin();
  }, [origin]);

  function handleChange({ target: { value } }) {
    // console.log(`${BASE_URL_MEAL_AREA}${value}`);
    setOrigin(value);
  }

  function renderRecipes() {
    return (
      <div>
        {recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <RecipeCard
            key={ idMeal }
            index={ index }
            recipe={ { id: idMeal, name: strMeal, image: strMealThumb } }
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <Header title="Explorar Origem" search />
      { showSearch && <SearchBar /> }
      <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
        <option data-testid="All-option">All</option>
        {areas.map((area, index) => (
          <option
            key={ `${area.strArea}${index}` }
            data-testid={ `${area.strArea}-option` }
          >
            { area.strArea }
          </option>
        ))}
      </select>
      {renderRecipes()}
      <Footer />
    </div>
  );
}

export default FoodOrigin;
