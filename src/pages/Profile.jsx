import React from 'react';
import { useHistory } from 'react-router-dom';

import { Header, Footer } from '../components';
import { getFromLocalStorage } from '../services/helpers/localStorage';

const Profile = () => {
  const history = useHistory();
  const { email } = getFromLocalStorage('user') || '';

  return (
    <main>
      <Header name="Perfil" />

      <h2 data-testid="profile-email">{ email }</h2>

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
        onClick={ () => { localStorage.clear(); history.push('/'); } }
      >
        Sair
      </button>

      <Footer />
    </main>
  );
};

export default Profile;
