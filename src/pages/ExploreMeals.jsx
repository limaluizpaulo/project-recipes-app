import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchMealsRandom } from '../services/mealsApi';

export default function ExploreMeals() {
  const [id, setId] = useState();
  useEffect(() => {
    fetchMealsRandom().then((res) => setId(res));
  }, []);
  return (
    <>
      <Header title="Explorar Comidas" />
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
      <Link to={ `/comidas/${id}` }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </>
  );
}
