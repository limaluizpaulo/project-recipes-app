import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';
import Footer from './Footer';
import Header from './Header';
import SBElements from './SBElements';

function ExpArea({ history }) {
  const { goSearch, setTitle } = useContext(ContextRecipes);

  useEffect(() => {
    setTitle('Explorar Origem');
  }, [setTitle]);

  return (
    <div>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <h1>Explorar Origem</h1>
      <Footer history={ history } />
    </div>
  );
}

ExpArea.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default ExpArea;
