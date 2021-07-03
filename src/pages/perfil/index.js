import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../context/user.context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Perfil() {
  const { userEmail } = useContext(UserContext);
  const history = useHistory();

  return (
    <div>
      <Header title="Perfil" showSearchIcon={ false } />
      <div>
        <p data-testid="profile-email">{ userEmail }</p>
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
