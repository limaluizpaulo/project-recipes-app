import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

export default function HeaderSearch({ title }) {
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
    </div>
  );
}

HeaderSearch.propTypes = {
  title: PropTypes.string.isRequired,
};
