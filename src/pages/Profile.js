import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Context } from '../context/ContextForm';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Profile(page).css';

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
      <div className="profile-container">
        <h3 className="user-title"><strong>Usuário:</strong></h3>
        <h4
          className="profile-title"
          data-testid="profile-email"
        >
          {getUser ? getUser.email : 'usuario@provedor.com'}
        </h4>
        <Link to="/receitas-feitas">
          <Button
            variant="info"
            type="button"
            className="profile-btn"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </Button>
        </Link>
        <Link to="/receitas-favoritas">
          <Button
            variant="info"
            className="profile-btn"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </Button>
        </Link>
        <Link to="/credits">
          <Button
            variant="info"
            className="profile-btn"
            type="button"
          >
            Credits
          </Button>
        </Link>
        <Link to="/">
          <Button
            variant="danger"
            className="profile-exitBtn"
            type="button"
            onClick={ () => { localStorage.clear(); handleFinish(); } }
            data-testid="profile-logout-btn"
          >
            Sair
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
