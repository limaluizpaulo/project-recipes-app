import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';
import Footer from './Footer';
import Header from './Header';
import SBElements from './SBElements';

function ExpIngredients({ history }) {
  const { goSearch, setTitle } = useContext(ContextRecipes);

  useEffect(() => {
    setTitle('Explorar Ingredientes');
  }, [setTitle]);

  return (
    <div>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <h1>Explorar Ingredientes</h1>
      <Footer history={ history } />
    </div>
  );
}

ExpIngredients.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default ExpIngredients;
