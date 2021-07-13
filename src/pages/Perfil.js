import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/Perfil.css';

function Perfil() {
  const history = useHistory();

  function checkUser() {
    if (!localStorage.getItem('user')) {
      return <p>Usuário não logado</p>;
    }
    return JSON.parse(localStorage.getItem('user')).email;
  }

  return (
    <div>
      <Header />
      <section className="profile-container">
        <h3
          data-testid="profile-email"
          className="profile-item text"
        >
          { checkUser }
        </h3>
        <button
          type="button"
          data-testid="profile-done-btn"
          className="profile-item btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="profile-item btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          className="profile-item btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Sair
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Perfil;
