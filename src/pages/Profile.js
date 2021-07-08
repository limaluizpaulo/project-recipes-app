import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/ContextForm';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const getUser = JSON.parse(localStorage.getItem('user'));
  const { changeFood,
    setChangeFood,
    changeDrink,
    setChangeDrink } = useContext(Context);

  function handleFinish() {
    if (changeFood) {
      setChangeFood(!changeFood);
    }
    if (changeDrink) {
      setChangeDrink(!changeDrink);
    }
  }

  return (
    <div>
      <Header title="Perfil" />
      <h2 data-testid="profile-email">{getUser.email}</h2>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          onClick={ () => { localStorage.clear(); handleFinish(); } }
          data-testid="profile-logout-btn"
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
