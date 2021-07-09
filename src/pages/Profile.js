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
    <main className="control-buttons-page">
      <Header title="Profile" showSearchIcon={ false } />
      <h3>{email}</h3>
      <section className="control-buttons-container">
        <button
          type="button"
          className="control-button"
          onClick={ () => { push('/receitas-feitas'); } }
        >
          Done Recipes
        </button>
        <button
          type="button"
          className="control-button"
          onClick={ () => { push('/receitas-favoritas'); } }
        >
          Favorite Recipes
        </button>
        <button type="button" className="last control-button" onClick={ logout }>
          Log out
        </button>
      </section>
      <Footer />
    </main>
  );
}

export default Profile;
