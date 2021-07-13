import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getRecipeByCategory,
  getFoodCategories,
  getFoodRecipes,
  getDrinkCategories,
  getDrinkRecipes,
  getDrinkByCategory,
} from '../services';

import './css/mainpage.css';
import '../main.css';
import { RecipeCards, Footer, Header } from '../components';

const FIVE = 5; // number of categories to render
const TWELVE = 12; // number of recipes to render

function MainPage({ history }) {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [filteredBy, setFilteredBy] = useState('');

  const { pathname } = history.location;

  // fetch API
  useEffect(() => {
    const getCatergories = async () => {
      const resp = pathname.includes('/comidas')
        ? await getFoodCategories()
        : await getDrinkCategories();
      setCategories(resp.slice(0, FIVE));
    };

    const getRecipes = async () => {
      const resp = pathname.includes('/comidas')
        ? await getFoodRecipes()
        : await getDrinkRecipes();
      setRecipes(resp.slice(0, TWELVE));
    };

    getCatergories();
    getRecipes();
  }, [pathname]);

  // filter results by category button
  const filterByCategory = async (category) => {
    if (filteredBy !== category) {
      setFilteredBy(category);
      const response = pathname.includes('/comidas')
        ? await getRecipeByCategory(category)
        : await getDrinkByCategory(category);
      setShowFiltered(true);
      setFilteredRecipes(response.slice(0, TWELVE));
    } else {
      setShowFiltered(false);
      setFilteredBy('');
    }
  };

  const recipesToRender = showFiltered ? filteredRecipes : recipes;

  return (
    <>
      <main>
        <section>
          <Header pathname={ pathname } newRecipes={ setRecipes } />
        </section>
        <section className="btn-container">
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => setShowFiltered(false) }
            className="categories-button"
          >
            All
          </button>
          {categories.map(({ strCategory }, idx) => (
            <button
              type="button"
              key={ idx }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => { filterByCategory(strCategory); } }
              className="categories-button"
            >
              {strCategory}
            </button>
          ))}
        </section>
        <RecipeCards history={ history } recipes={ recipesToRender } />
      </main>
      <Footer />
    </>
  );
}

MainPage.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default MainPage;
