import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import SBElements from './SBElements';
import ContextRecipes from '../context/contextRecipes';

function DrinkPage({ history }) {
  const { goSearch } = useContext(ContextRecipes);
  return (
    <div>
      <Header history={ history } />
      { goSearch && <SBElements /> }
      <Footer history={ history } />
    </div>
  );
}

DrinkPage.propTypes = {
  history: PropTypes.node.isRequired,
};

export default DrinkPage;
