import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [login, setLogin] = useState('');

  function successLogin(email) {
    setLogin(email);
  }

  return (
    <LoginContext.Provider value={ { successLogin, login } }>
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
