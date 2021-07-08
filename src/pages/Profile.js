import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/ContextForm';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const { changeFood,
    setChangeFood,
    changeDrink,
    setChangeDrink } = useContext(Context);

  const getUser = JSON.parse(localStorage.getItem('user'));

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
      <div className="exploreButtons-container">
        <h3><strong>Usuário:</strong></h3>
        <h4
          className="profileTitle"
          data-testid="profile-email"
        >
          {getUser ? getUser.email : 'usuario@usuario.com'}
        </h4>
        <Link to="/receitas-feitas">
          <button
            type="button"
            className="exploreButtons"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            className="exploreButtons"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            className="exitButton"
            type="button"
            onClick={ () => { localStorage.clear(); handleFinish(); } }
            data-testid="profile-logout-btn"
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
