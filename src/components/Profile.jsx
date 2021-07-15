import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';
import SBElements from './SBElements';
import ContextRecipes from '../context/contextRecipes';

function Profile({ history }) {
  const { goSearch, setTitle } = useContext(ContextRecipes);

  // https://blog.logrocket.com/localstorage-javascript-complete-guide/
  const userEmail = JSON.parse(localStorage.getItem('user'))
    || { email: 'exemplo@email.com' };
  const { email } = userEmail;

  const goFavorite = () => history.push('/receitas-favoritas');

  const goDone = () => history.push('/receitas-feitas');

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
        onClick={ goDone }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ goFavorite }
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
