import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const userEmail = userInfo && userInfo.email;

  const handleLogout = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Perfil" search={ false } />
      <p data-testid="profile-email">{ userEmail }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}
