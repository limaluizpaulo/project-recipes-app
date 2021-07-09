import React, { useState } from 'react';
import PropTypes from 'prop-types';

function InProgressButton(props) {
  const [disabled, setDisabled] = useState(true);
  const { value: { ingredientsQuantity, checked } } = props;
  if (ingredientsQuantity === checked && disabled === true) {
    setDisabled(false);
  }

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      disabled={ disabled }
    >
      <a href="/receitas-feitas">Finalizar Receita</a>
    </button>
  );
}

InProgressButton.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default InProgressButton;
