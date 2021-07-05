import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAreaRecipes } from '../services/RecipesServices';

function ExploreFoodsArea() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function getAreas() {
      const NUMBER_OF_AREAS = 12;
      const data = await fetchAreaRecipes();
      const twelveAreas = data.meals.slice(0, NUMBER_OF_AREAS);
      const areasItens = twelveAreas.map((area) => area.strArea);
      setAreas(areasItens);
    }
    getAreas();
  }, []);

  return (
    <>
      <Header profile name="Explorar Origem" search />
      <select data-testid="explore-by-area-dropdown">
        <option data-testid="All-option">All</option>
        {
          areas.map((area, index) => (
            <option
              data-testid={ `${area}-option` }
              key={ index }

            >
              {area}
            </option>
          ))
        }
      </select>
      <Footer />
    </>
  );
}

export default ExploreFoodsArea;
