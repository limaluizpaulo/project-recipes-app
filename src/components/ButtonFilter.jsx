import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function ButtonFilter({ nameBtn, btnFn }) {
  return (
    <Button
      type="button"
      value={ nameBtn }
      data-testid={ `filter-by-${nameBtn.toLowerCase()}-btn` }
      onClick={ btnFn }
    >
      {nameBtn}
    </Button>
  );
}

ButtonFilter.propTypes = {
  nameBtn: PropTypes.string.isRequired,
  btnFn: PropTypes.func.isRequired,
};

export default ButtonFilter;
