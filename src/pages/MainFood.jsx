import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFoodByCategory, getFoodCategories, getFoodRecipes } from '../services';
import '../main.css';

const FIVE = 5; // number of categories to render
const TWELVE = 12; // number of recipes to render

function MainFood({ history }) {
  const [categories, setCategories] = useState([]);
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [filteredBy, setFilteredBy] = useState('');

  // fetch API
  useEffect(() => {
    const getCatergories = async () => {
      const meals = await getFoodCategories();
      setCategories(meals.slice(0, FIVE));
    };

    const getRecipes = async () => {
      const meals = await getFoodRecipes();
      setFoodRecipes(meals.slice(0, TWELVE));
    };
    getCatergories();
    getRecipes();
  }, []);

  // filter results by category button
  const filterByCategory = async (category) => {
    if (filteredBy !== category) {
      setFilteredBy(category);
      const meals = await getFoodByCategory(category);
      setShowFiltered(true);
      setFilteredRecipes(meals.slice(0, TWELVE));
    } else {
      setShowFiltered(false);
      setFilteredBy('');
    }
  };

  const recipesToRender = showFiltered ? filteredRecipes : foodRecipes;

  return (
    <main>
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setShowFiltered(false) }
        >
          All
        </button>
        {categories.map(({ strCategory }, idx) => (
          <button
            type="button"
            key={ idx }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => { filterByCategory(strCategory); } }
          >
            {strCategory}
          </button>
        ))}
      </section>
      <section>
        {recipesToRender.map(({ strMealThumb, strMeal, idMeal }, idx) => (
          <section
            key={ idx }
            data-testid={ `${idx}-recipe-card` }
            onClick={ () => history.push(`/comidas/${idMeal}`) }
            onKeyDown={ () => history.push(`/comidas/${idMeal}`) }
            role="button"
            tabIndex={ 0 }
          >
            <img
              src={ strMealThumb }
              alt={ `Imagem do prato ${strMeal}` }
              data-testid={ `${idx}-card-img` }
            />
            <span data-testid={ `${idx}-card-name` }>{strMeal}</span>
          </section>
        ))}
      </section>
    </main>
  );
}

MainFood.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default MainFood;
