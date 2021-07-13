import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinksRandom } from '../services/drinksApi';

export default function ExploreDrinks() {
  const [id, setId] = useState();
  useEffect(() => {
    fetchDrinksRandom().then((res) => setId(res));
  }, []);
  return (
    <>
      <Header title="Explorar Bebidas" />
      <div className="links-page">

        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="btn btn-success"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to={ `/bebidas/${id}` }>
          <button
            type="button"
            data-testid="explore-surprise"
            className="btn btn-success"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}
