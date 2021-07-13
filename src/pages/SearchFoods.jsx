import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchMealsRandom } from '../services/Api';

function SearchFoods() {
  SearchFoods.displayName = 'Explorar Comidas';
  const [food, setFood] = useState();
  useEffect(() => {
    fetchMealsRandom().then((res) => setFood(res));
  }, []);
  console.log(food);
  return (
    <div>
      <Header title={ SearchFoods.displayName } />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to={ `/comidas/${food}` }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default SearchFoods;
