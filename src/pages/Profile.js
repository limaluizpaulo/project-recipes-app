import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const { push } = useHistory();

  const user = JSON.parse(localStorage.getItem('user'));
  const email = user ? user.email : '';

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
        <p>{ email }</p>
        <button
          type="button"
          value="Receitas Feitas"
          onClick={ () => { push('/receitas-feitas'); } }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          value="Receitas Favoritas"
          onClick={ () => { push('/receitas-favoritas'); } }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          value="Sair"
          onClick={ logout }
        >
          Sair
        </button>
      </div>
      <Footer />
    </main>
  );
}

export default Profile;
