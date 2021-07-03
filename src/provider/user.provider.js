import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/user.context';

function UserProvider({ children }) {
  const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const [userEmail, setUserEmail] = useState('');
  const [favorites, setFavorites] = useState(localFavorites);
  const [warningMessage, setWarningMessage] = useState('');

  const shared = {
    userEmail,
    setUserEmail,
    favorites,
    setFavorites,
    warningMessage,
    setWarningMessage,
  };

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (!favoriteRecipes) localStorage.setItem('favoriteRecipes', JSON.stringify([]));

    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (!inProgressRecipes) {
      const initialObj = { cocktails: {}, meals: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(initialObj));
    }

    const doneRecipes = localStorage.getItem('doneRecipes');
    if (!doneRecipes) localStorage.setItem('doneRecipes', JSON.stringify([]));
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('mealsToken', 1);
  }, [userEmail]);

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
