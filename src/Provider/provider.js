import React from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  return (
    <context.Provider>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
