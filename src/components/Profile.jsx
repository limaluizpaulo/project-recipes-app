import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';
import SBElements from './SBElements';
import ContextRecipes from '../context/contextRecipes';

function Profile({ history }) {
  const { goSearch } = useContext(ContextRecipes);
  return (
    <div>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <h1 data-testid="page-title">Perfil</h1>
      <Footer history={ history } />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default Profile;
