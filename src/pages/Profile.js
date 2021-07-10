import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();
  const [userEmail, setEmail] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      setEmail(email);
    }
  }, []);

  const clickButton = ({ target: { name } }) => {
    const domain = name === 'login' ? '' : name;
    console.log(`/${domain}`);
    history.push(`/${domain}`);
  };

  if (userEmail) {
    return (
      <>
        <Header />
        <p data-testid="profile-email">
          { userEmail }
        </p>
        <Button
          data-testid="profile-done-btn"
          name="receitas-feitas"
          onClick={ clickButton }
          type="button"
        >
          Receitas Feitas
        </Button>
        <Button
          data-testid="profile-favorite-btn"
          type="button"
          name="receitas-favoritas"
          onClick={ clickButton }
        >
          Receitas Favoritas
        </Button>
        <Button
          data-testid="profile-logout-btn"
          type="button"
          name="login"
          onClick={ (e) => { clickButton(e); localStorage.clear(); } }
        >
          Sair
        </Button>
        <Footer />
      </>
    );
  }
}
