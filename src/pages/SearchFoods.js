import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SearchFoods = () => {
  console.log('');
  return (
    <div>
      <Header title="Explorar Comidas" />
      <Link data-testid="explore-by-ingredient" to="/explorar/comidas/ingredientes">
        Por Ingredientes
      </Link>
      <Link data-testid="explore-by-area" to="/explorar/comidas/area">
        Por Local de Origem
      </Link>
      <Link data-testid="explore-surprise" to="/comidas/52771">
        Me Surpreenda!
      </Link>
      <Footer />
    </div>
  );
};

export default SearchFoods;
