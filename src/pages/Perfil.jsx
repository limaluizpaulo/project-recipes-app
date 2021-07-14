import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../helpers/Button';
import { getItem, setInitialItem } from '../helpers/HelperFunctions';

function Perfil() {
  setInitialItem('user', { email: '' });
  const { email } = getItem('user');
  const history = useHistory();

  return (
    <>
      <Header title="Perfil" />
      <span data-testid="profile-email">{ email }</span>
      <Button
        label="Receitas Feitas"
        testid="profile-done-btn"
        func={ () => history.push('/receitas-feitas') }
      />
      <Button
        label="Receitas Favoritas"
        testid="profile-favorite-btn"
        func={ () => history.push('/receitas-favoritas') }
      />
      <Button
        label="Sair"
        testid="profile-logout-btn"
        func={ () => {
          localStorage.clear();
          history.push('/');
        } }
      />
      <Footer />
    </>
  );
}

export default Perfil;
