import React from 'react';
import PropTypes from 'prop-types';

const LogoutButton = ({ history }) => {
  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <button
      className="button__receitas__sair"
      data-testid="profile-logout-btn"
      name="logout"
      onClick={ handleClick }
      type="button"
    >
      Sair
    </button>
  );
};

LogoutButton.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default LogoutButton;
