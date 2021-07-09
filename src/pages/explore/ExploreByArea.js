import React, { useContext, useEffect, useState } from 'react';

import MealsContext from '../../context/meals.context';
import { fetchAreas, fetchByArea } from '../../services';
import Header from '../../components/Header';
import RecipesList from '../../components/RecipesList';
import Footer from '../../components/Footer';
import { getRecipes } from '../../helpers';

function ExploreByArea() {
  const { setMeals } = useContext(MealsContext);
  const [areas, setAreas] = useState([]);

  async function handleChange({ target: { value } }) {
    if (value === 'All') {
      getRecipes({ type: 'meals', setFn: setMeals });
    } else {
      const result = await fetchByArea(value);
      setMeals(result);
    }
  }

  useEffect(() => {
    async function getAreas() {
      const result = await fetchAreas();
      if (result) setAreas(result);
    }
    getAreas();
    getRecipes({ type: 'meals', setFn: setMeals });
  }, [setMeals]);

  return (
    <main>
      <Header title="Explore by Region" showSearchIcon={ false } />
      <div className="control-buttons-container">
        <select className="control-select" onChange={ handleChange }>
          <option>All</option>
          {areas.map((item, index) => (
            <option key={ index }>{item.strArea}</option>
          ))}
        </select>
      </div>
      <RecipesList />
      <Footer />
    </main>
  );
}

export default ExploreByArea;
