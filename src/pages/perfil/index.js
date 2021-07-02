import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Perfil() {
  const history = useHistory();

  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Header title="Perfil" show={ false } />
      <div>
        <p data-testid="profile-email">{ email }</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          value="Receitas Feitas"
          onClick={ () => { history.push('/receitas-feitas'); } }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          value="Receitas Favoritas"
          onClick={ () => { history.push('/receitas-favoritas'); } }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          value="Sair"
          onClick={ () => {
            history.push('/');
            localStorage.clear();
          } }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Perfil;
