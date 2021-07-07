import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { setOnLocalStorage } from '../services/helpers/localStorage';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [verifyLogin, setVerifyLogin] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const removeFavorites = (id) => {
    const filteredFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(filteredFavorites);
  };

  const handleLogin = () => {
    const { email } = user;
    setOnLocalStorage('mealsToken', 1);
    setOnLocalStorage('cocktailsToken', 1);
    setOnLocalStorage('user', {
      email,
    });
    setVerifyLogin(true);
  };

  const validationUser = () => {
    const { email, password } = user;
    const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const Email = regex.test(email);
    const SEVEN = 7;
    if (Email && password.length >= SEVEN) return false;
    return true;
  };

  const handleChange = ({ target: { type, value } }) => {
    setUser({
      ...user,
      [type]: value,
    });
    validationUser();
  };

  const context = {
    favorites,
    removeFavorites,
    verifyLogin,
    handleChange,
    validationUser,
    handleLogin,
  };

  return (
    <UserContext.Provider value={ context }>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
