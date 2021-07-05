import React from 'react';
import PropTypes from 'prop-types';

const Instructions = ({ newObj }) => {
  const { instructions } = newObj;

  return (
    <div>
      <section>
        <h3>Instructions</h3>
        <p
          data-testid="instructions"
        >
          {instructions}
        </p>
      </section>
    </div>
  );
};

Instructions.propTypes = {
  instructions: PropTypes.string,
  obj: PropTypes.object,
}.isRequired;

export default Instructions;
