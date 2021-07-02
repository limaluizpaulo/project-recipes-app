import React from 'react';
import PropTypes from 'prop-types';

const DoneButton = ({ history }) => {
  const handleClick = () => {
    history.push('/receitas-feitas');
  };

  return (
    <button
      data-testid="profile-done-btn"
      name="done"
      onClick={ handleClick }
      type="button"
    >
      Receitas Feitas
    </button>
  );
};

DoneButton.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default DoneButton;
