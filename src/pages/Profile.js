import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../context/user.context';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const { userEmail } = useContext(UserContext);
  const { push } = useHistory();

  return (
    <main>
      <Header title="Perfil" showSearchIcon={ false } />
      <div>
        <p data-testid="profile-email">{ userEmail }</p>
        <button
          type="button"
          value="Receitas Feitas"
          onClick={ () => { push('/receitas-feitas'); } }
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          value="Receitas Favoritas"
          onClick={ () => { push('/receitas-favoritas'); } }
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          value="Sair"
          onClick={ () => { push('/'); localStorage.clear(); } }
          data-testid="profile-logout-btn"
        >
          Sair
        </button>
      </div>
      <Footer />
    </main>
  );
}

export default Profile;
