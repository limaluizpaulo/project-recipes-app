import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const { push } = useHistory();

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('inProgressRecipes');
    localStorage.removeItem('favoriteRecipes');
    push('/');
  }

  return (
    <main>
      <Header title="Perfil" showSearchIcon={ false } />
      <div>
        <p data-testid="profile-email">{ email }</p>
        <button
          type="button"
          value="Receitas Feitas"
          onClick={ () => { push('/receitas-feitas'); } }
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          value="Receitas Favoritas"
          onClick={ () => { push('/receitas-favoritas'); } }
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          value="Sair"
          onClick={ logout }
          data-testid="profile-logout-btn"
        >
          Sair
        </button>
      </div>
      <Footer />
    </main>
  );
}

export default Profile;
