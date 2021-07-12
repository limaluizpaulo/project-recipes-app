import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import SBElements from './SBElements';
import ContextRecipes from '../context/contextRecipes';
import Footer from './Footer';

function ExploreFoods({ history }) {
  const { goSearch, setTitle } = useContext(ContextRecipes);

  useEffect(() => {
    setTitle('Explorar Comidas');
  }, [setTitle]);

  return (
    <div>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <h1>Explorar Comidas</h1>
      <Link to="/explorar/comidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">
          Por Local de Origem
        </button>
      </Link>
      <Link to="/explorar/comidas/:id">
        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </Link>
      <Footer history={ history } />
    </div>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default ExploreFoods;
