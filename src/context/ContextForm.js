import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const object = {
    email,
    setEmail,
    pass,
    setPass,
  };

  return (
    <Context.Provider value={ object }>
      { children }
    </Context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.Node,
}.isRequired;
