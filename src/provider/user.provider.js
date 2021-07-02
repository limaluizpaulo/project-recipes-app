import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/user.context';

function UserProvider({ children }) {
  const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const [user, setUser] = useState({ email: '', password: '' });
  const [favorites, setFavorites] = useState(localFavorites);
  const [showMessage, setShowMessage] = useState(false);

  const shared = {
    user,
    setUser,
    favorites,
    setFavorites,
    showMessage,
    setShowMessage,
  };

  useEffect(() => {
    const LIMIT = 3000;
    setTimeout(() => {
      setShowMessage(false);
    }, LIMIT);
  }, [showMessage]);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <UserContext.Provider value={ { ...shared } }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
