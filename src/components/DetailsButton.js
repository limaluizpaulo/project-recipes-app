import React from 'react';
import PropTypes from 'prop-types';
import saveInProgress from '../services/SaveInProgress';

function DetailsButton(props) {
  const { value: {
    url,
    food,
    recipe,
    inProgress,
    setInProgress,
  } } = props;

  if (!inProgress) {
    return (
      <button
        className="start"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ saveInProgress({ recipe, url, food, setInProgress }) }
      >
        <a href={ `${url}/in-progress` }>Iniciar Receita</a>
      </button>
    );
  }
  return (
    <button
      className="start"
      data-testid="start-recipe-btn"
      type="button"
    >
      <a href={ `${url}/in-progress` }>Continuar Receita</a>
    </button>
  );
}

DetailsButton.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailsButton;
