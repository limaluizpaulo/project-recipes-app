import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getListArea, getFoodRecipes, getMealByArea } from '../services';
import { RecipeCards, Footer, Header } from '../components';
import './css/selectExploreArea.css';

function ExploreArea({ history }) {
  const TWELVE = 12;
  const { pathname } = history.location;
  const [listArea, setListArea] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [filteredBy, setFilteredBy] = useState('');

  useEffect(() => {
    const getRecipes = async () => {
      const resp = await getFoodRecipes();
      setRecipes(resp.slice(0, TWELVE));
    };
    const getAreas = async () => {
      const respAreas = await getListArea();
      setListArea(respAreas);
    };
    getAreas();
    getRecipes();
  }, [pathname, recipes]);

  useEffect(() => {
    const filterByArea = async (area) => {
      if (area === '') return;
      if (area === 'All') {
        const resp = await getFoodRecipes();
        setFilteredRecipes(resp.slice(0, TWELVE));
        return;
      }
      setShowFiltered(true);
      const response = await getMealByArea(area);
      setFilteredRecipes(response.slice(0, TWELVE));
    };
    filterByArea(filteredBy);
  }, [filteredBy]);

  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFilteredBy(value);
  };

  const recipesToRender = showFiltered ? filteredRecipes : recipes;

  return (
    <>
      <main>
        <Header pathname={ history.location.pathname } />
        <label htmlFor="areas">
          <select
            data-testid="explore-by-area-dropdown"
            name="filter"
            onChange={ handleChange }
          >
            <option data-testid="All-option">All</option>
            {listArea.map((item, index) => (
              <option
                key={ index }
                data-testid={ `${item.strArea}-option` }
              >
                { item.strArea }
              </option>
            ))}
          </select>
        </label>
        <RecipeCards history={ history } recipes={ recipesToRender } />
      </main>
      <section>
        <Footer />
      </section>
    </>
  );
}

ExploreArea.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default ExploreArea;
