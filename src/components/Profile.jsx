import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';
import SBElements from './SBElements';
import ContextRecipes from '../context/contextRecipes';

function Profile({ history }) {
  const { goSearch, setTitle } = useContext(ContextRecipes);

  // https://blog.logrocket.com/localstorage-javascript-complete-guide/
  const userEmail = JSON.parse(localStorage.getItem('user'));
  const { email } = userEmail;

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    setTitle('Perfil');
  }, [setTitle]);

  return (
    <div>
      <Header history={ history } data-testid="page-title" />
      { goSearch && <SBElements history={ history } /> }
      <h2 data-testid="profile-email">{email}</h2>
      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClick }
      >
        Sair
      </button>
      <Footer history={ history } />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default Profile;
