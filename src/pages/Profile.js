import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    function getEmail() {
      setEmail(localStorage.getItem('user', 'value'));
    }
    getEmail();
  }, []);

  function handeClickLogOut() {
    localStorage.clear();
    history.push('/');
  }
  /*
  const email = localStorage.getItem('user', 'value').split('"')[3]; */
  return (
    <div>
      <Header title="Perfil" display="false" />
      {email
      && (
        <p data-testid="profile-email">
          {email.split('"')[3]}
        </p>)}

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
        onClick={ handeClickLogOut }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}
