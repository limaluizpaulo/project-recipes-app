import React from 'react';
import PropTypes from 'prop-types';
/*

*/

function ConditionButton({ children, ...props }) {
  return (
    <button
      type="button"
      { ...props }
    >
      { children }
    </button>
  );
}

ConditionButton.propTypes = {
  children: PropTypes.node.isRequired,
  props: PropTypes.shape(PropTypes.object).isRequired,
};

export default ConditionButton;
