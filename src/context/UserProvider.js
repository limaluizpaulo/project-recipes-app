import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { setOnLocalStorage } from '../services/helpers/localStorage';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const [verifyLogin, setVerifyLogin] = useState(false);

  const verifyEmail = ({ target }) => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (emailRegex.test(target.value)) setEmail(target.value);
    else setEmail('');
    setDisable(!(email.length > 0 && password.length > 0));
  };

  const verifyPassword = ({ target }) => {
    const passwordMinLength = 6;
    if (target.value.length >= passwordMinLength) setPassword(target.value);
    else setPassword('');
    console.log();
    setDisable(!(email.length > 0 && password.length > 0));
  };

  const handleLogin = () => {
    setOnLocalStorage('user', email);
    setOnLocalStorage('mealsToken', 1);
    setOnLocalStorage('cocktailsToken', 1);
    setVerifyLogin(true);
  };

  const context = {
    email,
    password,
    verifyEmail,
    verifyPassword,
    handleLogin,
    disable,
    verifyLogin,
  };

  return (
    <UserContext.Provider value={ context }>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
