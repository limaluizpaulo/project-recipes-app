import React from 'react';
import PropTypes from 'prop-types';

function ButtonFilter({ nameBtn, btnFn }) {
  return (
    <button
      type="button"
      value={ nameBtn }
      data-testid={ `filter-by-${nameBtn.toLowerCase()}-btn` }
      onClick={ btnFn }
    >
      {nameBtn}
    </button>
  );
}

ButtonFilter.propTypes = {
  nameBtn: PropTypes.string.isRequired,
  btnFn: PropTypes.func.isRequired,
};

export default ButtonFilter;
