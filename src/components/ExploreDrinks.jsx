import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import SBElements from './SBElements';
import Footer from './Footer';
import ContextRecipes from '../context/contextRecipes';

function ExploreDrinks({ history }) {
  const { goSearch, setTitle } = useContext(ContextRecipes);

  useEffect(() => {
    setTitle('Explorar Bebidas');
  }, [setTitle]);

  return (
    <div>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <h1>Explorar Bebidas</h1>
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/bebidas/:id">
        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </Link>
      <Footer history={ history } />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default ExploreDrinks;
