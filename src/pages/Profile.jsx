import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const [email, setEmail] = useState();
  useEffect(() => {
    const GetEmail = () => {
      const emailUser = localStorage.getItem('user');
      setEmail(emailUser);
    };
    GetEmail();
  }, []);
  const deleteUser = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  };

  return (
    <div>
      <Header title="Perfil" />
      <p data-testid="profile-email">{ email }</p>

      <Link to="/receitas-feitas">
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => deleteUser() }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}
