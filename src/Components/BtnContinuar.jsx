import PropTypes from 'prop-types';
import React from 'react';

export default function BtnContinuar(props) {
  const { iniciarReceita } = props;
  return (
    <button
      type="button"
      className="btn-iniciar-receita "
      data-testid="start-recipe-btn"
      onClick={ iniciarReceita }
    >
      Continuar Receita

    </button>
  );
}

BtnContinuar.propTypes = {
  iniciarReceita: PropTypes.any,
}.isRequired;
