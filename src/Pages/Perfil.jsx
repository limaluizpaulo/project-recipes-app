import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Context from '../context/Context';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

export default function Perfil() {
  const { openSearchBar } = useContext(Context);
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleClick = ({ id }) => {
    if (!id) {
      localStorage.clear();
      return history.push('/');
    }
    return history.push(`/${id}`);
  };

  return (
    <div>
      <Header title="Perfil" />
      { openSearchBar ? <SearchBar /> : null }
      <span>{'Email: '}</span>
      <span data-testid="profile-email">{ email }</span>
      <Button
        variant="primary"
        type="button"
        data-testid="profile-done-btn"
        id="receitas-feitas"
        onClick={ ({ target }) => handleClick(target) }
        block
      >
        Receitas Feitas
      </Button>
      <Button
        variant="success"
        type="button"
        data-testid="profile-favorite-btn"
        id="receitas-favoritas"
        onClick={ ({ target }) => handleClick(target) }
        block
      >
        Receitas Favoritas
      </Button>
      <Button
        variant="danger"
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClick }
        block
      >
        Sair
      </Button>
    </div>
  );
}
