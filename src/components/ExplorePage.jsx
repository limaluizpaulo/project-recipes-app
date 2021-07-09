import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import SBElements from './SBElements';
import ContextRecipes from '../context/contextRecipes';

function ExplorePage({ history }) {
  const { goSearch, setTitle } = useContext(ContextRecipes);

  useEffect(() => {
    setTitle('Explorar');
  }, [setTitle]);

  return (
    <div>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <Footer history={ history } />
    </div>
  );
}

ExplorePage.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default ExplorePage;
