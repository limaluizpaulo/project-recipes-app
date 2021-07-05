import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/HeadBar';

const clickLogout = () => {
  localStorage.clear();
};

const Profile = () => {
  const email = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')).email
    : '';
  console.log(email);
  return (
    <div>
      <Header title="Perfil" />
      <h3 data-testid="profile-email">{email}</h3>
      <Link to="/receitas-feitas">
        <Button data-testid="profile-done-btn">Receitas Feitas</Button>
      </Link>
      <Link to="/receitas-favoritas">
        <Button data-testid="profile-favorite-btn">Receitas Favoritas</Button>
      </Link>
      <Link to="/">
        <Button
          data-testid="profile-logout-btn"
          onClick={ () => clickLogout() }
        >
          Sair
        </Button>
      </Link>
      <Footer />
    </div>
  );
};

export default Profile;
