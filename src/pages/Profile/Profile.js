import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Profile() {
  const [userInfos, setUserInfos] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const getUserInfo = JSON.parse(localStorage.getItem('user'));
      setUserInfos(getUserInfo.userInfos);
    } else {
      setUserInfos('');
    }
  }, [userInfos]);

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div id="page-drinks">
      <div>
        <Header title="Perfil" haveSrc={ false } />

        <span data-testid="profile-email">{userInfos}</span>

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
          onClick={ logout }
        >
          Sair
        </button>

        <Footer />
      </div>
    </div>
  );
}

export default Profile;
