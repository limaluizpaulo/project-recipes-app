import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import LoginContext from '../context/LoginContext';

function InProgressButton(props) {
  const { value: { ingredientsQuantity, checked, recipe } } = props;
  const { push } = useHistory();
  const [disabled, setDisabled] = useState(true);
  const { doneDefault } = useContext(LoginContext);

  if (ingredientsQuantity === checked && disabled === true) {
    setDisabled(false);
  }

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      disabled={ disabled }
      onClick={ () => {
        doneDefault(recipe);
        push('/receitas-feitas');
      } }
    >
      Finalizar Receita
    </button>
  );
}

InProgressButton.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default InProgressButton;
