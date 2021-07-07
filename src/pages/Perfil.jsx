import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  Perfil.displayName = 'Perfil';
  const [userEmail, setState] = useState();
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    localStorage.setItem('mealsToken', JSON.stringify(null));
    localStorage.setItem('cocktailsToken', JSON.stringify(null));
    localStorage.setItem('user', JSON.stringify(null));
    // localStorage.setItem('doneRecipes', JSON.stringify(null));
    // localStorage.setItem('favoriteRecipes', JSON.stringify(null));
    // localStorage.setItem('inProgressRecipes', JSON.stringify(null));
    setRedirect(true);
    return redirect;
  };

  useEffect(() => {
    const getEmail = () => {
      const email = JSON.parse(localStorage.getItem('user'));
      setState(email.email);
    };
    getEmail();
  },

  []);

  return (

    <div>
      <Header title={ Perfil.displayName } />
      <p data-testid="profile-email">{ userEmail }</p>
      <Link
        to="/receitas-favoritas"
        data-testid="profile-favorite-btn"
      >
        Receitas Favoritas
      </Link>
      <br />
      <Link
        to="/receitas-feitas"
        data-testid="profile-done-btn"
      >
        Receitas Feitas
      </Link>
      <br />
      <Link
        to="/"
        data-testid="profile-logout-btn"
        onClick={ handleClick }
      >
        Sair
      </Link>
      <Footer />
    </div>
  );
}

export default Perfil;
