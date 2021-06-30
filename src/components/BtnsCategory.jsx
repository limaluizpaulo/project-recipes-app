import React from 'react';
import PropTypes from 'prop-types';

export default function BtnsCategory({ label }) {
  const { strCategory } = label;
  return (
    <div>
      <button
        type="button"
        value={ strCategory }
        data-testid={ `${strCategory}-category-filter` }
      >
        {strCategory}
      </button>
    </div>
  );
}
// console.log(strCategory);

BtnsCategory.propTypes = {
  label: PropTypes.shape().isRequired,
  // title: PropTypes.string.isRequired,
};
