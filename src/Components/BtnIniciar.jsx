import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function BtnIniciar(props) {
  const { iniciarReceita, url } = props;
  return (
    <Link to={ `${url}/in-progress` }>
      <button
        type="button"
        className="btn-iniciar-receita "
        data-testid="start-recipe-btn"
        onClick={ iniciarReceita }
      >
        iniciar receita

      </button>
    </Link>
  );
}

BtnIniciar.propTypes = {
  iniciarOuContinuar: PropTypes.any,
  iniciarReceita: PropTypes.any,
}.isRequired;
