import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title }) {
  const history = useHistory();

  const handleClick = () => {
    history.push('/perfil');
  };

  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        onClick={ handleClick }
      >
        <img src={ profileIcon } alt="profile icon" />
      </button>

      <h2 data-testid="page-title">{title}</h2>

      <button
        type="button"
        src={ searchIcon }
        // onclick={() => searchBar}
      >
        <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
      </button>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
