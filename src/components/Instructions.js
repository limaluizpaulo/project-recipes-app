import React from 'react';
import PropTypes from 'prop-types';

function Instructions(props) {
  const { value: recipe } = props;
  const prepareInstructions = recipe.strInstructions;
  return (
    <div
      className="instructions"
      data-testid="instructions"
    >
      <h5>Instructions</h5>
      <p>{prepareInstructions}</p>
    </div>
  );
}

Instructions.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Instructions;
