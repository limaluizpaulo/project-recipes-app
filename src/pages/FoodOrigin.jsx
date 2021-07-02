import React, { useContext, useState } from 'react';
// import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context';
import SearchBar from '../components/SearchBar';
import RecipesMealCard from '../components/RecipesMealCard';

const BASE_URL_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MAX_NUMBER_OF_ITEMS = 12;

function FoodOrigin() {
  const { areas, recipes, setRecipes, showSearch } = useContext(RecipeContext);
  const [showValues, setShowValues] = useState(false);

  async function handleChange({ target: { value } }) {
    const fetchSearch = await fetch(BASE_URL_MEAL);
    const response = await fetchSearch.json();
    const filteredValues = value === 'All'
      ? response.meals
      : response.meals.filter((recipe) => recipe.strArea === value);
    filteredValues.splice(MAX_NUMBER_OF_ITEMS);
    console.log(filteredValues);
    setRecipes(filteredValues);
    setShowValues(true);
  }

  function renderRecipes() {
    return (
      <div>
        {recipes.map((recipe, index) => (
          <RecipesMealCard
            key={ index }
            index={ index }
            recipe={ recipe }
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <Header title="Explorar Origem" />
      { showSearch && <SearchBar /> }
      <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
        <option>All</option>
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
